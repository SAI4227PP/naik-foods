import express from 'express'

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cartController.js'

const router = express.Router()

/*
|--------------------------------------------------------------------------
| Cart Routes
|--------------------------------------------------------------------------
*/

/*
 * Get/create cart
 *
 * GET /api/cart/:cartId
 */
router.get(
  '/:cartId',
  getCart,
)

/*
 * Add product
 *
 * POST /api/cart/:cartId/items
 */
router.post(
  '/:cartId/items',
  addCartItem,
)

/*
 * Update quantity
 *
 * PUT /api/cart/:cartId/items/:productId
 */
router.put(
  '/:cartId/items/:productId',
  updateCartItem,
)

/*
 * Remove product
 *
 * DELETE /api/cart/:cartId/items/:productId
 */
router.delete(
  '/:cartId/items/:productId',
  removeCartItem,
)

/*
 * Clear cart
 *
 * DELETE /api/cart/:cartId
 */
router.delete(
  '/:cartId',
  clearCart,
)

export default router