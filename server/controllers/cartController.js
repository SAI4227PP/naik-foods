import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

import {
  isValidObjectId,
  validateQuantity,
  validateSessionId,
} from '../utils/validation.js'

const FREE_DELIVERY_THRESHOLD = 999

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function roundMoney(value) {
  return Math.round(
    (value + Number.EPSILON) * 100,
  ) / 100
}

function calculateCartTotals(items) {
  const subtotal = roundMoney(
    items.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0,
    ),
  )

  /*
   * Naik Foods requirement:
   * Free delivery above ₹999.
   *
   * Delivery charge is currently kept at
   * ₹0 because we have not implemented
   * real delivery/shipping calculation yet.
   */

  const deliveryCharge = 0

  const total = roundMoney(
    subtotal + deliveryCharge,
  )

  return {
    subtotal,
    deliveryCharge,
    total,
  }
}

function formatCart(cart) {
  return {
    id: cart._id,

    cartId: cart.cartId,

    items: cart.items,

    subtotal: cart.subtotal,

    freeDeliveryThreshold:
      cart.freeDeliveryThreshold,

    remainingForFreeDelivery:
      Math.max(
        0,
        cart.freeDeliveryThreshold -
          cart.subtotal,
      ),

    deliveryCharge:
      cart.deliveryCharge,

    total: cart.total,

    itemCount: cart.items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    ),

    updatedAt: cart.updatedAt,
  }
}

/*
|--------------------------------------------------------------------------
| GET CART
|--------------------------------------------------------------------------
|
| GET /api/cart/:cartId
|
*/

export async function getCart(
  req,
  res,
  next,
) {
  try {
    const { cartId } = req.params

    /*
     * Validate cart/session ID.
     */

    if (!validateSessionId(cartId)) {
      res.status(400)

      throw new Error(
        'Invalid cartId',
      )
    }

    /*
     * Normalize whitespace.
     */

    const normalizedCartId =
      cartId.trim()

    let cart =
      await Cart.findOne({
        cartId: normalizedCartId,
      })

    /*
     * Create a new empty cart if it
     * does not exist.
     */

    if (!cart) {
      cart = await Cart.create({
        cartId: normalizedCartId,

        items: [],

        subtotal: 0,

        freeDeliveryThreshold:
          FREE_DELIVERY_THRESHOLD,

        deliveryCharge: 0,

        total: 0,
      })
    }

    res.status(200).json({
      success: true,

      cart: formatCart(cart),
    })
  } catch (error) {
    next(error)
  }
}

/*
|--------------------------------------------------------------------------
| ADD ITEM
|--------------------------------------------------------------------------
|
| POST /api/cart/:cartId/items
|
| Body:
|
| {
|   "productId": "...",
|   "quantity": 1
| }
|
*/

export async function addCartItem(
  req,
  res,
  next,
) {
  try {
    const { cartId } = req.params

    const {
      productId,
      quantity = 1,
    } = req.body

    /*
     * Validate cart ID.
     */

    if (!validateSessionId(cartId)) {
      res.status(400)

      throw new Error(
        'Invalid cartId',
      )
    }

    /*
     * Validate product ID.
     */

    if (!isValidObjectId(productId)) {
      res.status(400)

      throw new Error(
        'Invalid productId',
      )
    }

    /*
     * Validate quantity.
     */

    const requestedQuantity =
      validateQuantity(quantity)

    if (requestedQuantity === null) {
      res.status(400)

      throw new Error(
        'Quantity must be a positive integer',
      )
    }

    /*
     * IMPORTANT:
     *
     * Never trust product price,
     * name, image, etc. from React.
     *
     * Always get the product from MongoDB.
     */

    const product =
      await Product.findOne({
        _id: productId,

        isActive: true,

        price: {
          $gt: 0,
        },
      })

    if (!product) {
      res.status(404)

      throw new Error(
        'Product not found or unavailable',
      )
    }

    /*
     * Check stock.
     */

    if (product.stock <= 0) {
      res.status(400)

      throw new Error(
        `${product.name} is currently out of stock`,
      )
    }

    /*
     * Requested quantity cannot exceed
     * current stock.
     */

    if (
      requestedQuantity >
      product.stock
    ) {
      res.status(400)

      throw new Error(
        `Only ${product.stock} units of ${product.name} are available`,
      )
    }

    /*
     * Find existing cart.
     */

    const normalizedCartId =
      cartId.trim()

    let cart =
      await Cart.findOne({
        cartId: normalizedCartId,
      })

    /*
     * Create cart if necessary.
     */

    if (!cart) {
      cart = await Cart.create({
        cartId: normalizedCartId,

        items: [],

        freeDeliveryThreshold:
          FREE_DELIVERY_THRESHOLD,

        subtotal: 0,

        deliveryCharge: 0,

        total: 0,
      })
    }

    /*
     * Check whether product already exists.
     */

    const existingItem =
      cart.items.find(
        (item) =>
          item.product.toString() ===
          product._id.toString(),
      )

    if (existingItem) {
      const newQuantity =
        existingItem.quantity +
        requestedQuantity

      /*
       * Never allow cart quantity above
       * current stock.
       */

      if (
        newQuantity >
        product.stock
      ) {
        res.status(400)

        throw new Error(
          `Only ${product.stock} units of ${product.name} are available`,
        )
      }

      existingItem.quantity =
        newQuantity

      /*
       * Refresh product information.
       */

      existingItem.name =
        product.name

      existingItem.price =
        product.price

      existingItem.image =
        product.image

      existingItem.weight =
        product.weight
    } else {
      cart.items.push({
        product:
          product._id,

        name:
          product.name,

        price:
          product.price,

        image:
          product.image,

        weight:
          product.weight,

        quantity:
          requestedQuantity,
      })
    }

    /*
     * Recalculate totals from trusted
     * database values.
     */

    const totals =
      calculateCartTotals(
        cart.items,
      )

    cart.subtotal =
      totals.subtotal

    cart.deliveryCharge =
      totals.deliveryCharge

    cart.total =
      totals.total

    await cart.save()

    res.status(200).json({
      success: true,

      message:
        'Product added to cart',

      cart: formatCart(cart),
    })
  } catch (error) {
    next(error)
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE ITEM QUANTITY
|--------------------------------------------------------------------------
|
| PUT /api/cart/:cartId/items/:productId
|
| Body:
|
| {
|   "quantity": 3
| }
|
*/

export async function updateCartItem(
  req,
  res,
  next,
) {
  try {
    const {
      cartId,
      productId,
    } = req.params

    const {
      quantity,
    } = req.body

    /*
     * Validate cart ID.
     */

    if (!validateSessionId(cartId)) {
      res.status(400)

      throw new Error(
        'Invalid cartId',
      )
    }

    /*
     * Validate product ID.
     */

    if (!isValidObjectId(productId)) {
      res.status(400)

      throw new Error(
        'Invalid productId',
      )
    }

    /*
     * Validate quantity.
     */

    const requestedQuantity =
      validateQuantity(quantity)

    if (requestedQuantity === null) {
      res.status(400)

      throw new Error(
        'Quantity must be a positive integer',
      )
    }

    /*
     * Get current product from DB.
     */

    const product =
      await Product.findOne({
        _id: productId,

        isActive: true,

        price: {
          $gt: 0,
        },
      })

    if (!product) {
      res.status(404)

      throw new Error(
        'Product not found or unavailable',
      )
    }

    /*
     * Validate stock.
     */

    if (
      requestedQuantity >
      product.stock
    ) {
      res.status(400)

      throw new Error(
        `Only ${product.stock} units of ${product.name} are available`,
      )
    }

    /*
     * Find cart.
     */

    const cart =
      await Cart.findOne({
        cartId: cartId.trim(),
      })

    if (!cart) {
      res.status(404)

      throw new Error(
        'Cart not found',
      )
    }

    /*
     * Find cart item.
     */

    const item =
      cart.items.find(
        (cartItem) =>
          cartItem.product.toString() ===
          productId,
      )

    if (!item) {
      res.status(404)

      throw new Error(
        'Product is not in the cart',
      )
    }

    /*
     * Refresh trusted product data.
     */

    item.name =
      product.name

    item.price =
      product.price

    item.image =
      product.image

    item.weight =
      product.weight

    item.quantity =
      requestedQuantity

    /*
     * Recalculate totals.
     */

    const totals =
      calculateCartTotals(
        cart.items,
      )

    cart.subtotal =
      totals.subtotal

    cart.deliveryCharge =
      totals.deliveryCharge

    cart.total =
      totals.total

    await cart.save()

    res.status(200).json({
      success: true,

      message:
        'Cart quantity updated',

      cart: formatCart(cart),
    })
  } catch (error) {
    next(error)
  }
}

/*
|--------------------------------------------------------------------------
| REMOVE ITEM
|--------------------------------------------------------------------------
|
| DELETE /api/cart/:cartId/items/:productId
|
*/

export async function removeCartItem(
  req,
  res,
  next,
) {
  try {
    const {
      cartId,
      productId,
    } = req.params

    /*
     * Validate cart ID.
     */

    if (!validateSessionId(cartId)) {
      res.status(400)

      throw new Error(
        'Invalid cartId',
      )
    }

    /*
     * Validate product ID.
     */

    if (!isValidObjectId(productId)) {
      res.status(400)

      throw new Error(
        'Invalid productId',
      )
    }

    /*
     * Find cart.
     */

    const cart =
      await Cart.findOne({
        cartId: cartId.trim(),
      })

    if (!cart) {
      res.status(404)

      throw new Error(
        'Cart not found',
      )
    }

    const originalLength =
      cart.items.length

    /*
     * Remove requested product.
     */

    cart.items =
      cart.items.filter(
        (item) =>
          item.product.toString() !==
          productId,
      )

    /*
     * Product wasn't present.
     */

    if (
      cart.items.length ===
      originalLength
    ) {
      res.status(404)

      throw new Error(
        'Product is not in the cart',
      )
    }

    /*
     * Recalculate totals.
     */

    const totals =
      calculateCartTotals(
        cart.items,
      )

    cart.subtotal =
      totals.subtotal

    cart.deliveryCharge =
      totals.deliveryCharge

    cart.total =
      totals.total

    await cart.save()

    res.status(200).json({
      success: true,

      message:
        'Product removed from cart',

      cart: formatCart(cart),
    })
  } catch (error) {
    next(error)
  }
}

/*
|--------------------------------------------------------------------------
| CLEAR CART
|--------------------------------------------------------------------------
|
| DELETE /api/cart/:cartId
|
*/

export async function clearCart(
  req,
  res,
  next,
) {
  try {
    const { cartId } = req.params

    /*
     * Validate cart ID.
     */

    if (!validateSessionId(cartId)) {
      res.status(400)

      throw new Error(
        'Invalid cartId',
      )
    }

    /*
     * Find cart.
     */

    const cart =
      await Cart.findOne({
        cartId: cartId.trim(),
      })

    if (!cart) {
      res.status(404)

      throw new Error(
        'Cart not found',
      )
    }

    /*
     * Empty cart.
     */

    cart.items = []

    cart.subtotal = 0

    cart.deliveryCharge = 0

    cart.total = 0

    await cart.save()

    res.status(200).json({
      success: true,

      message:
        'Cart cleared',

      cart: formatCart(cart),
    })
  } catch (error) {
    next(error)
  }
}