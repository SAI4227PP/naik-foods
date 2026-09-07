import Product from '../models/Product.js'

export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      region,
      minRating,
      maxPrice,
      inStock,
      sort,
    } = req.query

    const filter = {
      isActive: true,
      price: {
        $gt: 0,
      },
    }

    // Category filter
    if (category && category !== 'All') {
      filter.category = category
    }

    // Region filter
    if (region && region !== 'All') {
      filter.region = region
    }

    // Rating filter
    if (minRating) {
      filter.rating = {
        $gte: Number(minRating),
      }
    }

    // Price filter
    if (maxPrice) {
      filter.price = {
        $gt: 0,
        $lte: Number(maxPrice),
      }
    }

    // Stock filter
    if (inStock === 'true') {
      filter.stock = {
        $gt: 0,
      }
    }

    // Search
    if (search?.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i')

      filter.$or = [
        {
          name: searchRegex,
        },
        {
          category: searchRegex,
        },
        {
          region: searchRegex,
        },
        {
          tags: searchRegex,
        },
      ]
    }

    let query = Product.find(filter)

    // Sorting
    switch (sort) {
      case 'price-low':
        query = query.sort({ price: 1 })
        break

      case 'price-high':
        query = query.sort({ price: -1 })
        break

      case 'rating':
        query = query.sort({
          rating: -1,
          reviewCount: -1,
        })
        break

      case 'name':
        query = query.sort({
          name: 1,
        })
        break

      case 'newest':
      default:
        query = query.sort({
          createdAt: -1,
        })
        break
    }

    const products = await query

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
    })

    if (!product) {
      res.statusCode = 404

      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    next(error)
  }
}