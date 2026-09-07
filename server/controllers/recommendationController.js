import Product from '../models/Product.js'
import { generateRecommendations } from '../utils/recommendationEngine.js'
import { isValidObjectId } from '../utils/validation.js'

export const getRecommendations = async (req, res, next) => {
  try {
    const ids = String(req.query.cartProductIds || '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)

    const validIds = ids.filter(isValidObjectId)

    const cartProducts =
      validIds.length > 0
        ? await Product.find({
            _id: { $in: validIds },
            isActive: true,
            price: { $gt: 0 },
          })
        : []

    const excludedIds = cartProducts.map((product) => product._id)

    const availableProducts = await Product.find({
      _id: { $nin: excludedIds },
      isActive: true,
      price: { $gt: 0 },
      stock: { $gt: 0 },
    }).limit(100)

    const recommendations = generateRecommendations(
      availableProducts,
      cartProducts,
      6,
    )

    res.status(200).json({
      success: true,
      count: recommendations.length,
      recommendations,
    })
  } catch (error) {
    next(error)
  }
}