import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getCart,
  addCartItem,
  updateCartItem as updateCartItemApi,
  removeCartItem as removeCartItemApi,
  clearCart as clearCartApi,
} from '../services/api'

const CartContext = createContext(null)

const CART_ID_STORAGE_KEY = 'naik-foods-cart-id'
const FREE_DELIVERY_THRESHOLD = 999

function getCartId() {
  try {
    let cartId = localStorage.getItem(
      CART_ID_STORAGE_KEY,
    )

    if (!cartId) {
      cartId = crypto.randomUUID()

      localStorage.setItem(
        CART_ID_STORAGE_KEY,
        cartId,
      )
    }

    return cartId
  } catch {
    return `cart-${Date.now()}`
  }
}

function normalizeCartItems(items = []) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => ({
    id: item.product || item.id,
    name: item.name || '',
    price: Number(item.price || 0),
    image: item.image || '',
    weight: item.weight || '',
    quantity: Number(item.quantity || 1),
    stock: Number(item.stock ?? 999),
  }))
}

function getRemainingForFreeDelivery(subtotal) {
  return Math.max(
    FREE_DELIVERY_THRESHOLD -
      Number(subtotal || 0),
    0,
  )
}

export function CartProvider({ children }) {
  const [cartId] = useState(getCartId)

  const [cartItems, setCartItems] = useState([])

  const [cartSubtotal, setCartSubtotal] =
    useState(0)

  const [
    remainingForFreeDelivery,
    setRemainingForFreeDelivery,
  ] = useState(FREE_DELIVERY_THRESHOLD)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSyncing, setIsSyncing] =
    useState(false)

  const [error, setError] = useState('')

  function updateCartState(cart) {
    const items = normalizeCartItems(
      cart?.items,
    )

    const subtotal = Number(
      cart?.subtotal || 0,
    )

    setCartItems(items)
    setCartSubtotal(subtotal)

    setRemainingForFreeDelivery(
      cart?.remainingForFreeDelivery ??
        getRemainingForFreeDelivery(
          subtotal,
        ),
    )
  }

  /*
   * Load cart from MongoDB
   */
  useEffect(() => {
    let mounted = true

    async function loadCart() {
      try {
        setIsLoading(true)
        setError('')

        const response =
          await getCart(cartId)

        if (!mounted) return

        updateCartState(response?.cart)
      } catch (err) {
        if (!mounted) return

        console.error(
          'Cart loading failed:',
          err,
        )

        setError(
          err.message ||
            'Unable to sync cart. Please try again.',
        )
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadCart()

    return () => {
      mounted = false
    }
  }, [cartId])

  /*
   * Add product
   */
  const addToCart = async (
    product,
    quantity = 1,
  ) => {
    if (!product) {
      return false
    }

    const productId =
      product.id || product._id

    if (!productId) {
      console.error(
        'Cannot add product without ID',
      )
      return false
    }

    const stock = Number(
      product.stock ?? 0,
    )

    if (stock <= 0) {
      setError(
        `${product.name || 'Product'} is out of stock.`,
      )
      return false
    }

    const requestedQuantity =
      Number(quantity)

    if (
      !Number.isInteger(
        requestedQuantity,
      ) ||
      requestedQuantity < 1
    ) {
      return false
    }

    try {
      setIsSyncing(true)
      setError('')

      const response =
        await addCartItem(
          cartId,
          productId,
          requestedQuantity,
        )

      updateCartState(response?.cart)

      return true
    } catch (err) {
      console.error(
        'Add to cart failed:',
        err,
      )

      setError(
        err.message ||
          'Unable to add product to cart.',
      )

      return false
    } finally {
      setIsSyncing(false)
    }
  }

  /*
   * Update quantity
   */
  const updateQuantity = async (
    productId,
    quantity,
  ) => {
    if (!productId) {
      return false
    }

    const requestedQuantity =
      Number(quantity)

    if (
      !Number.isInteger(
        requestedQuantity,
      ) ||
      requestedQuantity < 1
    ) {
      return false
    }

    try {
      setIsSyncing(true)
      setError('')

      const response =
        await updateCartItemApi(
          cartId,
          productId,
          requestedQuantity,
        )

      updateCartState(response?.cart)

      return true
    } catch (err) {
      console.error(
        'Cart quantity update failed:',
        err,
      )

      setError(
        err.message ||
          'Unable to update quantity.',
      )

      return false
    } finally {
      setIsSyncing(false)
    }
  }

  /*
   * Remove product
   */
  const removeFromCart = async (
    productId,
  ) => {
    if (!productId) {
      return false
    }

    try {
      setIsSyncing(true)
      setError('')

      const response =
        await removeCartItemApi(
          cartId,
          productId,
        )

      updateCartState(response?.cart)

      return true
    } catch (err) {
      console.error(
        'Remove cart item failed:',
        err,
      )

      setError(
        err.message ||
          'Unable to remove product.',
      )

      return false
    } finally {
      setIsSyncing(false)
    }
  }

  /*
   * Clear entire cart
   */
  const clearCart = async () => {
    try {
      setIsSyncing(true)
      setError('')

      const response =
        await clearCartApi(cartId)

      updateCartState(response?.cart)

      return true
    } catch (err) {
      console.error(
        'Clear cart failed:',
        err,
      )

      setError(
        err.message ||
          'Unable to clear cart.',
      )

      return false
    } finally {
      setIsSyncing(false)
    }
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0,
    )
  }, [cartItems])

  const cartTotal = cartSubtotal

  const value = {
    cartId,

    cartItems,
    cartCount,

    cartSubtotal,
    cartTotal,
    remainingForFreeDelivery,

    isLoading,
    isSyncing,
    error,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// The hook is intentionally exported with the provider from this context module.
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider',
    )
  }

  return context
}
