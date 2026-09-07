import Product from '../models/Product.js'

const CATEGORY_ALIASES = {
  'snacks & namkeen': 'snacks',
  'pickles & condiments': 'pickles',
  'dry/instant grocery': 'grocery',
  'dry & instant grocery': 'grocery',
}

const normalizeCategory = (category = '') => {
  return CATEGORY_ALIASES[category.trim().toLowerCase()] || null
}

export const createCombo = async (req, res, next) => {
  try {
    const { productIds } = req.body

    if (!Array.isArray(productIds)) {
      res.status(400)
      throw new Error('productIds must be an array')
    }

    if (productIds.length !== 3) {
      res.status(400)
      throw new Error('A Maharashtra Box must contain exactly 3 products')
    }

    // Prevent duplicate products.
    const uniqueProductIds = [...new Set(productIds)]

    if (uniqueProductIds.length !== 3) {
      res.status(400)
      throw new Error(
        'A Maharashtra Box must contain 3 different products',
      )
    }

    const products = await Product.find({
      _id: { $in: uniqueProductIds },
      isActive: true,
    })

    if (products.length !== 3) {
      res.status(400)
      throw new Error(
        'One or more selected products are unavailable',
      )
    }

    // Check stock and price.
    for (const product of products) {
      if (Number(product.stock) <= 0) {
        res.status(400)
        throw new Error(`${product.name} is out of stock`)
      }

      if (Number(product.price) <= 0) {
        res.status(400)
        throw new Error(
          `${product.name} cannot be added to a combo`,
        )
      }
    }

    // Determine the three supported combo categories.
    const normalizedCategories = products.map((product) =>
      normalizeCategory(product.category),
    )

    if (normalizedCategories.includes(null)) {
      res.status(400)
      throw new Error(
        'Combo contains a product from an unsupported category',
      )
    }

    // A valid box must contain:
    // 1 snack
    // 1 pickle
    // 1 grocery item
    const requiredCategories = ['snacks', 'pickles', 'grocery']

    const hasAllCategories = requiredCategories.every((category) =>
      normalizedCategories.includes(category),
    )

    if (!hasAllCategories) {
      res.status(400)
      throw new Error(
        'Choose one product from each of the three combo categories',
      )
    }

    const total = products.reduce(
      (sum, product) => sum + Number(product.price || 0),
      0,
    )

    const freeDelivery = total >= 999

    res.status(200).json({
      success: true,
      message: 'Maharashtra Box validated successfully',
      products,
      total,
      freeDelivery,
    })
  } catch (error) {
    next(error)
  }
}