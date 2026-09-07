import axios from 'axios'
import * as cheerio from 'cheerio'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import connectDB from '../config/db.js'
import Product from '../models/Product.js'

dotenv.config()

const BASE_URL = 'https://www.naikfoods.co.in'
const STORE_URL = `${BASE_URL}/in/store`

const http = axios.create({
  timeout: 20000,

  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36',

    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  },
})

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function cleanText(value = '') {
  return String(value)
    .replace(/\s+/g, ' ')
    .replace(/\u00a0/g, ' ')
    .trim()
}

function absoluteUrl(url) {
  if (!url) {
    return ''
  }

  try {
    if (
      url.startsWith('http://') ||
      url.startsWith('https://')
    ) {
      return url
    }

    return new URL(url, BASE_URL).href
  } catch {
    return ''
  }
}

function slugFromUrl(url) {
  try {
    const cleanUrl = url
      .split('?')[0]
      .replace(/\/$/, '')

    return cleanUrl
      .split('/')
      .pop()
      .toLowerCase()
  } catch {
    return ''
  }
}

function getImageFromSrcSet(srcSet) {
  if (!srcSet) {
    return ''
  }

  const candidates = srcSet
    .split(',')
    .map((item) => item.trim())
    .map((item) => item.split(/\s+/)[0])
    .filter(Boolean)

  return candidates[candidates.length - 1] || ''
}

/*
|--------------------------------------------------------------------------
| Image URL normalization
|--------------------------------------------------------------------------
|
| Live Naik Foods uses:
|
| /_next/image?url=https://res.cloudinary.com/...
|
| We extract the original Cloudinary URL.
|
|--------------------------------------------------------------------------
*/

function normalizeImageUrl(src) {
  if (!src) {
    return ''
  }

  let imageUrl = String(src).trim()

  /*
   * Next.js optimized image URL
   */
  if (
    imageUrl.includes('/_next/image') &&
    imageUrl.includes('url=')
  ) {
    try {
      const parsed = new URL(
        imageUrl,
        BASE_URL,
      )

      const originalUrl =
        parsed.searchParams.get('url')

      if (originalUrl) {
        imageUrl = originalUrl
      }
    } catch {
      return ''
    }
  }

  /*
   * Decode nested URL encoding.
   *
   * Example:
   * %2520 -> %20 -> space
   */
  try {
    for (let i = 0; i < 3; i += 1) {
      const decoded =
        decodeURIComponent(imageUrl)

      if (decoded === imageUrl) {
        break
      }

      imageUrl = decoded
    }
  } catch {
    // Keep current value.
  }

  return absoluteUrl(imageUrl)
}

/*
|--------------------------------------------------------------------------
| Product Image Extraction
|--------------------------------------------------------------------------
*/

function extractProductImage($) {
  const candidates = []

  /*
   * 1. Look specifically for product images.
   */
  $('img').each((_, element) => {
    const $img = $(element)

    const src =
      $img.attr('src') ||
      $img.attr('data-src') ||
      getImageFromSrcSet(
        $img.attr('srcset'),
      ) ||
      getImageFromSrcSet(
        $img.attr('data-srcset'),
      )

    if (!src) {
      return
    }

    const alt = cleanText(
      $img.attr('alt') || '',
    ).toLowerCase()

    /*
     * Ignore obvious website images.
     */
    if (
      alt.includes('logo') ||
      alt.includes('free delivery') ||
      alt.includes('secure pay') ||
      alt.includes('support') ||
      alt.includes('easy returns')
    ) {
      return
    }

    /*
     * Strong preference for product image.
     */
    if (
      alt.includes('product image') ||
      alt.includes('thumbnail') ||
      alt.includes('product')
    ) {
      candidates.unshift(src)
    } else {
      candidates.push(src)
    }
  })

  /*
   * 2. OpenGraph image fallback.
   */
  const ogImage = $(
    'meta[property="og:image"]',
  ).attr('content')

  if (ogImage) {
    candidates.push(ogImage)
  }

  /*
   * 3. JSON-LD image fallback.
   */
  $(
    'script[type="application/ld+json"]',
  ).each((_, element) => {
    try {
      const raw = $(element).html()

      if (!raw) {
        return
      }

      const data = JSON.parse(raw)

      const objects = Array.isArray(data)
        ? data
        : [data]

      for (const object of objects) {
        if (!object) {
          continue
        }

        if (
          object['@type'] === 'Product' &&
          object.image
        ) {
          const images = Array.isArray(
            object.image,
          )
            ? object.image
            : [object.image]

          candidates.push(...images)
        }
      }
    } catch {
      // Ignore invalid JSON-LD.
    }
  })

  /*
   * 4. Prefer Cloudinary.
   */
  for (const candidate of candidates) {
    const image =
      normalizeImageUrl(candidate)

    if (!image) {
      continue
    }

    if (
      image.includes('logo') ||
      image.includes('favicon') ||
      image.includes('icon')
    ) {
      continue
    }

    if (
      image.includes('res.cloudinary.com')
    ) {
      return image
    }
  }

  /*
   * 5. General fallback.
   */
  for (const candidate of candidates) {
    const image =
      normalizeImageUrl(candidate)

    if (!image) {
      continue
    }

    if (
      image.includes('logo') ||
      image.includes('favicon') ||
      image.includes('icon')
    ) {
      continue
    }

    return image
  }

  return ''
}

/*
|--------------------------------------------------------------------------
| JSON-LD
|--------------------------------------------------------------------------
*/

function extractJsonLd($) {
  const objects = []

  $(
    'script[type="application/ld+json"]',
  ).each((_, element) => {
    try {
      const raw = $(element).html()

      if (!raw) {
        return
      }

      const data = JSON.parse(raw)

      if (Array.isArray(data)) {
        objects.push(...data)
      } else {
        objects.push(data)
      }
    } catch {
      // Ignore invalid JSON-LD.
    }
  })

  return objects
}

function findProductSchema(objects) {
  for (const object of objects) {
    if (
      !object ||
      typeof object !== 'object'
    ) {
      continue
    }

    const type = object['@type']

    if (
      type === 'Product' ||
      (Array.isArray(type) &&
        type.includes('Product'))
    ) {
      return object
    }

    if (
      Array.isArray(object['@graph'])
    ) {
      const product =
        object['@graph'].find(
          (item) => {
            if (!item) {
              return false
            }

            const itemType =
              item['@type']

            return (
              itemType === 'Product' ||
              (Array.isArray(itemType) &&
                itemType.includes(
                  'Product',
                ))
            )
          },
        )

      if (product) {
        return product
      }
    }
  }

  return null
}

/*
|--------------------------------------------------------------------------
| Product Name
|--------------------------------------------------------------------------
*/

function extractProductName($) {
  /*
   * The live page begins with:
   *
   * Product Details
   *
   * and later contains:
   *
   * Multi Millet Noodles
   *
   * Therefore never blindly use h1.first().
   */

  const headings = $('h1')
    .map((_, element) =>
      cleanText($(element).text()),
    )
    .get()
    .filter(Boolean)

  const actualHeading =
    headings.find(
      (heading) =>
        !/^Product Details$/i.test(
          heading,
        ),
    )

  if (actualHeading) {
    return actualHeading
  }

  /*
   * OpenGraph fallback.
   */
  const ogTitle = $(
    'meta[property="og:title"]',
  ).attr('content')

  if (ogTitle) {
    return cleanText(
      ogTitle.replace(
        /\s*\|\s*Naik Foods.*$/i,
        '',
      ),
    )
  }

  /*
   * Title fallback.
   */
  const title = cleanText(
    $('title').text(),
  )

  if (title) {
    return cleanText(
      title.replace(
        /\s*\|\s*Naik Foods.*$/i,
        '',
      ),
    )
  }

  return ''
}

/*
|--------------------------------------------------------------------------
| Product Section
|--------------------------------------------------------------------------
*/

function findProductSection($, productName) {
  const headings = $('h1')

  for (
    let i = 0;
    i < headings.length;
    i += 1
  ) {
    const heading = $(headings[i])

    const text = cleanText(
      heading.text(),
    )

    if (
      text.toLowerCase() !==
      productName.toLowerCase()
    ) {
      continue
    }

    /*
     * Start with parent.
     */
    let current = heading

    /*
     * Move upward until we find a useful
     * product container.
     */
    for (
      let level = 0;
      level < 5;
      level += 1
    ) {
      current = current.parent()

      if (!current.length) {
        break
      }

      const textLength = cleanText(
        current.text(),
      ).length

      /*
       * Product section normally contains:
       *
       * Product name
       * Reviews
       * Price
       * Weight
       * Highlights
       */
      if (
        textLength > 100 &&
        textLength < 10000
      ) {
        return current
      }
    }

    return heading.parent()
  }

  return $('body')
}

/*
|--------------------------------------------------------------------------
| Price
|--------------------------------------------------------------------------
*/

function parsePrice(text) {
  if (!text) {
    return 0
  }

  const matches = String(text)
    .replace(/,/g, '')
    .match(
      /₹\s*[0-9]+(?:\.[0-9]+)?/g,
    )

  if (!matches) {
    return 0
  }

  for (const match of matches) {
    const numberMatch =
      match.match(
        /₹\s*([0-9]+(?:\.[0-9]+)?)/,
      )

    if (!numberMatch) {
      continue
    }

    const price = Number(
      numberMatch[1],
    )

    /*
     * Reject the site's free delivery
     * threshold if it appears in the section.
     */
    if (
      Number.isFinite(price) &&
      price >= 0 &&
      price < 100000 &&
      price !== 999
    ) {
      return price
    }
  }

  return 0
}

/*
|--------------------------------------------------------------------------
| Reviews
|--------------------------------------------------------------------------
*/

function parseReviews(text) {
  if (!text) {
    return 0
  }

  const match = String(text).match(
    /\(?\s*([\d,]+)\s+Reviews?\s*\)?/i,
  )

  if (!match) {
    return 0
  }

  return Number(
    match[1].replace(/,/g, ''),
  )
}

/*
|--------------------------------------------------------------------------
| Rating
|--------------------------------------------------------------------------
*/

function parseRating(productSchema) {
  const rating =
    productSchema?.aggregateRating
      ?.ratingValue

  if (rating === undefined) {
    return 0
  }

  const value = Number(rating)

  if (
    !Number.isFinite(value) ||
    value < 0 ||
    value > 5
  ) {
    return 0
  }

  return value
}

/*
|--------------------------------------------------------------------------
| Weight
|--------------------------------------------------------------------------
*/

function extractWeight(source) {
  let text = ''

  if (typeof source === 'string') {
    text = cleanText(source)
  } else {
    text = cleanText(source.text())
  }

  const match = text.match(
    /Weight:\s*([0-9]+(?:\.[0-9]+)?\s*(?:g|kg|ml|l))/i,
  )

  return match ? match[1] : ''
}

/*
|--------------------------------------------------------------------------
| Description
|--------------------------------------------------------------------------
*/

function extractDescription($) {
  const sections = []

  $('h3, h4').each(
    (_, heading) => {
      const headingText = cleanText(
        $(heading).text(),
      )

      if (!headingText) {
        return
      }

      const sectionParts = []

      let current =
        $(heading).next()

      while (current.length) {
        const tagName =
          current
            .get(0)
            ?.tagName
            ?.toLowerCase()

        if (
          tagName === 'h3' ||
          tagName === 'h4'
        ) {
          break
        }

        const text = cleanText(
          current.text(),
        )

        if (text) {
          sectionParts.push(text)
        }

        current = current.next()
      }

      if (sectionParts.length > 0) {
        sections.push(
          `${headingText}: ${sectionParts.join(
            ' ',
          )}`,
        )
      }
    },
  )

  return sections
    .join('\n\n')
    .slice(0, 5000)
}

/*
|--------------------------------------------------------------------------
| Remove ONLY unwanted tags
|--------------------------------------------------------------------------
|
| Everything else remains unchanged.
|
*/

function removeUnwantedTags(tags) {
  const unwantedTags = new Set([
    'home',
    'about',
    'shop',
    'blogs',
    'contact',
    'store',
  ])

  return tags.filter(
    (tag) =>
      !unwantedTags.has(
        cleanText(tag).toLowerCase(),
      ),
  )
}

/*
|--------------------------------------------------------------------------
| Tags / Highlights
|--------------------------------------------------------------------------
*/

function extractTags($, productName) {
  const tags = new Set()

  /*
   * Product subtitle.
   *
   * Example:
   *
   * Millet Goodness, Crunchy, Delight
   */

  $('h1').each((_, heading) => {
    const headingText = cleanText(
      $(heading).text(),
    )

    if (
      headingText.toLowerCase() !==
      productName.toLowerCase()
    ) {
      return
    }

    $(heading)
      .parent()
      .find('p, span')
      .each((_, element) => {
        const text = cleanText(
          $(element).text(),
        )

        if (
          text &&
          text.length < 100 &&
          text.includes(',')
        ) {
          text
            .split(',')
            .map((tag) =>
              cleanText(tag),
            )
            .filter(Boolean)
            .forEach((tag) =>
              tags.add(tag),
            )
        }
      })
  })

  /*
   * Product highlights.
   */

  $('li').each((_, element) => {
    const text = cleanText(
      $(element).text(),
    )

    if (!text) {
      return
    }

    if (text.length > 100) {
      return
    }

    if (
      /add to cart/i.test(text)
    ) {
      return
    }

    if (/select/i.test(text)) {
      return
    }

    if (/reviews?/i.test(text)) {
      return
    }

    if (/check delivery/i.test(text)) {
      return
    }

    tags.add(text)
  })

  /*
   * Remove product name.
   */
  tags.delete(productName)

  /*
   * Remove ONLY:
   *
   * Home
   * About
   * Shop
   * Blogs
   * Contact
   * Store
   *
   * All other tags remain.
   */
  const cleanedTags =
    removeUnwantedTags(
      Array.from(tags),
    )

  return cleanedTags.slice(
    0,
    20,
  )
}

/*
|--------------------------------------------------------------------------
| Fetch
|--------------------------------------------------------------------------
*/

async function fetchPage(url) {
  const response =
    await http.get(url)

  return response.data
}

/*
|--------------------------------------------------------------------------
| Discover Product URLs
|--------------------------------------------------------------------------
*/

async function discoverProductUrls() {
  const productUrls = new Set()

  for (
    let page = 1;
    page <= 10;
    page += 1
  ) {
    const url =
      page === 1
        ? STORE_URL
        : `${STORE_URL}?page=${page}`

    console.log(
      `Scanning store page ${page}: ${url}`,
    )

    try {
      const html =
        await fetchPage(url)

      const $ = cheerio.load(html)

      $('a[href]').each(
        (_, element) => {
          const href =
            $(element).attr('href')

          if (!href) {
            return
          }

          const absolute =
            absoluteUrl(href)

          if (
            absolute.includes(
              '/in/products/',
            )
          ) {
            productUrls.add(
              absolute.split('?')[0],
            )
          }
        },
      )

      console.log(
        `Found ${productUrls.size} product URLs so far.`,
      )
    } catch (error) {
      console.error(
        `Failed to scan page ${page}: ${error.message}`,
      )
    }

    await sleep(500)
  }

  return Array.from(productUrls)
}

/*
|--------------------------------------------------------------------------
| Discover Categories
|--------------------------------------------------------------------------
|
| Instead of guessing categories from the
| product page, scan category pages.
|
|--------------------------------------------------------------------------
*/

async function discoverCategoryMap() {
  const categoryMap = new Map()

  const categoryPages = [
    {
      name: 'Snacks & Namkeen',
      url: `${BASE_URL}/in/categories/snacks-and-namkeen`,
    },

    {
      name: 'Pickles & Condiments',
      url: `${BASE_URL}/in/categories/pickles-and-condiments`,
    },

    {
      name: 'Sweets & Bakery',
      url: `${BASE_URL}/in/categories/sweets-and-bakery`,
    },

    {
      name: 'Dairy & Beverages',
      url: `${BASE_URL}/in/categories/dairy-and-beverages`,
    },

    {
      name: 'Mukhvas & Digestives',
      url: `${BASE_URL}/in/categories/mukhvas-and-digestives`,
    },

    {
      name: 'Confectionery',
      url: `${BASE_URL}/in/categories/confectionery`,
    },

    {
      name: 'Spices & Masalas',
      url: `${BASE_URL}/in/categories/spices-and-masalas`,
    },

    {
      name: 'Dry/Instant Grocery',
      url: `${BASE_URL}/in/categories/dry-instant-grocery`,
    },
  ]

  console.log(
    '\nScanning category pages...\n',
  )

  for (const category of categoryPages) {
    try {
      console.log(
        `Category: ${category.name}`,
      )

      const html =
        await fetchPage(category.url)

      const $ = cheerio.load(html)

      let found = 0

      $('a[href]').each(
        (_, element) => {
          const href =
            $(element).attr('href')

          if (!href) {
            return
          }

          const absolute =
            absoluteUrl(href)

          if (
            !absolute.includes(
              '/in/products/',
            )
          ) {
            return
          }

          const slug =
            slugFromUrl(absolute)

          if (!slug) {
            return
          }

          if (!categoryMap.has(slug)) {
            categoryMap.set(
              slug,
              [],
            )
          }

          const categories =
            categoryMap.get(slug)

          if (
            !categories.includes(
              category.name,
            )
          ) {
            categories.push(
              category.name,
            )
          }

          found += 1
        },
      )

      console.log(
        `  Found ${found} products`,
      )
    } catch (error) {
      console.error(
        `  Failed: ${error.message}`,
      )
    }

    await sleep(500)
  }

  return categoryMap
}

/*
|--------------------------------------------------------------------------
| Extract Product
|--------------------------------------------------------------------------
*/

function extractProductData(
  html,
  productUrl,
  categoryMap,
) {
  const $ = cheerio.load(html)

  const jsonLd =
    extractJsonLd($)

  const productSchema =
    findProductSchema(jsonLd)

  /*
   * Name
   */
  const name =
    productSchema?.name ||
    extractProductName($)

  /*
   * Product section
   */
  const productSection =
    findProductSection(
      $,
      name,
    )

  const productText =
    cleanText(
      productSection.text(),
    )

  /*
   * Price
   */
  let price =
    productSchema?.offers?.price ??
    productSchema?.offers?.[0]?.price

  if (price !== undefined) {
    price = Number(
      String(price).replace(
        /,/g,
        '',
      ),
    )
  }

  /*
   * JSON-LD price should be trusted only
   * when it looks valid.
   */
  if (
    !Number.isFinite(price) ||
    price === 999 ||
    price >= 100000
  ) {
    price = parsePrice(
      productText,
    )
  }

  /*
   * If still not found, inspect the text
   * immediately after the product heading.
   */
  if (!price) {
    const nearbyText =
      cleanText(
        productSection
          .find('h1')
          .first()
          .parent()
          .text(),
      )

    price = parsePrice(
      nearbyText,
    )
  }

  /*
   * Weight
   */
  const weight =
    extractWeight(
      productText,
    )

  /*
   * Reviews
   */
  const reviewCount =
    productSchema
      ?.aggregateRating
      ?.reviewCount
      ? Number(
          productSchema
            .aggregateRating
            .reviewCount,
        )
      : parseReviews(
          productText,
        )

  /*
   * Rating
   */
  const rating =
    parseRating(
      productSchema,
    )

  /*
   * Image
   */
  const image =
    extractProductImage($)

  /*
   * Description
   */
  const description =
    extractDescription($)

  /*
   * Tags
   */
  const tags =
    extractTags(
      $,
      name,
    )

  /*
   * Category
   */
  const slug =
    slugFromUrl(productUrl)

  const categories =
    categoryMap.get(slug) || []

  const category =
    categories[0] ||
    'Dry/Instant Grocery'

  /*
   * Return normalized product.
   */
  return {
    name: cleanText(name),

    slug,

    description,

    price,

    weight,

    category,

    region: 'Maharashtra',

    image,

    rating,

    reviewCount,

    /*
     * Demo inventory for our assignment.
     *
     * This is NOT claimed to be live
     * Naik Foods inventory.
     */
    stock: 20,

    tags,

    isActive:
      Boolean(name) &&
      Number.isFinite(price) &&
      price > 0,

    sourceUrl: productUrl,
  }
}

/*
|--------------------------------------------------------------------------
| Import Products
|--------------------------------------------------------------------------
*/

async function importProducts() {
  try {
    await connectDB()

    console.log(
      '\nStarting Naik Foods product import...\n',
    )

    /*
     * Clean the previously corrupted seed data.
     *
     * IMPORTANT:
     * This should be removed after the first
     * successful clean import.
     */
    console.log(
      'Removing previous imported products...',
    )

    await Product.deleteMany({})

    /*
     * Discover categories first.
     */
    const categoryMap =
      await discoverCategoryMap()

    /*
     * Discover all product URLs.
     */
    const productUrls =
      await discoverProductUrls()

    console.log(
      `\nTotal unique product URLs found: ${productUrls.length}\n`,
    )

    if (
      productUrls.length === 0
    ) {
      throw new Error(
        'No product URLs found. The live website structure may have changed.',
      )
    }

    let successful = 0
    let failed = 0
    let skipped = 0

    /*
     * Import each product.
     */
    for (
      let index = 0;
      index < productUrls.length;
      index += 1
    ) {
      const productUrl =
        productUrls[index]

      console.log(
        `[${index + 1}/${productUrls.length}] Fetching ${productUrl}`,
      )

      try {
        const html =
          await fetchPage(
            productUrl,
          )

        const product =
          extractProductData(
            html,
            productUrl,
            categoryMap,
          )

        /*
         * Validate parsed data.
         */
        if (
          !product.name ||
          product.name ===
            'Product Details'
        ) {
          skipped += 1

          console.log(
            '  ⚠ Skipped: invalid product name',
          )

          continue
        }

        if (
          !Number.isFinite(
            product.price,
          ) ||
          product.price <= 0
        ) {
          skipped += 1

          console.log(
            `  ⚠ Skipped: invalid price ${product.price}`,
          )

          continue
        }

        if (
          product.price === 99924
        ) {
          skipped += 1

          console.log(
            '  ⚠ Skipped suspicious price ₹99924',
          )

          continue
        }

        /*
         * Save/update product.
         */
        await Product.findOneAndUpdate(
          {
            slug: product.slug,
          },
          {
            $set: product,
          },
          {
            upsert: true,
            returnDocument: 'after',
            setDefaultsOnInsert: true,
          },
        )

        successful += 1

        console.log(
          `  ✓ ${product.name} | ₹${product.price} | ${product.weight} | ${product.category}`,
        )

        console.log(
          `    Image: ${
            product.image
              ? 'FOUND'
              : 'NOT FOUND'
          }`,
        )

        console.log(
          `    Reviews: ${product.reviewCount} | Rating: ${product.rating}`,
        )

        console.log(
          `    Description: ${
            product.description
              ? 'FOUND'
              : 'NOT FOUND'
          }`,
        )

        console.log(
          `    Tags: ${product.tags.length}`,
        )

        if (
          product.tags.length > 0
        ) {
          console.log(
            `    Highlights: ${product.tags.join(
              ' | ',
            )}`,
          )
        }

        await sleep(400)
      } catch (error) {
        failed += 1

        console.error(
          `  ✗ Failed: ${productUrl}`,
        )

        console.error(
          `    ${error.message}`,
        )
      }
    }

    /*
     * Final summary.
     */
    const databaseCount =
      await Product.countDocuments()

    const productsWithImages =
      await Product.countDocuments({
        image: {
          $exists: true,
          $ne: '',
        },
      })

    console.log(
      '\n--------------------------------',
    )

    console.log(
      'Naik Foods import completed',
    )

    console.log(
      '--------------------------------',
    )

    console.log(
      `Successful:        ${successful}`,
    )

    console.log(
      `Skipped:           ${skipped}`,
    )

    console.log(
      `Failed:            ${failed}`,
    )

    console.log(
      `Discovered:        ${productUrls.length}`,
    )

    console.log(
      `MongoDB products:  ${databaseCount}`,
    )

    console.log(
      `Products w/images: ${productsWithImages}`,
    )

    console.log(
      '--------------------------------\n',
    )
  } catch (error) {
    console.error(
      '\nImport failed:',
      error,
    )
  } finally {
    await mongoose.connection.close()

    process.exit(0)
  }
}

importProducts()