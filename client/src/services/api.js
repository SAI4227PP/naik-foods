const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

function normalizeProduct(product) {
  if (!product) return product

  return {
    ...product,
    id: product.id || product._id,
  }
}

function normalizeProducts(products = []) {
  return products.map(normalizeProduct)
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value)
    }
  })

  const queryString = query.toString()

  const data = await request(
    `/products${queryString ? `?${queryString}` : ''}`,
  )

  return {
    ...data,
    products: normalizeProducts(data.products),
  }
}

export async function getProductById(productId) {
  const data = await request(`/products/${productId}`)

  return {
    ...data,
    product: normalizeProduct(data.product),
  }
}

export async function getRecommendations(productIds = []) {
  const query = productIds.join(',')

  return request(
    `/recommendations?cartProductIds=${encodeURIComponent(query)}`,
  )
}

export async function getCart(cartId) {
  return request(`/cart/${cartId}`)
}

export async function addCartItem(
  cartId,
  productId,
  quantity = 1,
) {
  return request(`/cart/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({
      productId,
      quantity,
    }),
  })
}

export async function updateCartItem(
  cartId,
  productId,
  quantity,
) {
  return request(`/cart/${cartId}/items/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({
      quantity,
    }),
  })
}

export async function removeCartItem(
  cartId,
  productId,
) {
  return request(
    `/cart/${cartId}/items/${productId}`,
    {
      method: 'DELETE',
    },
  )
}

export async function clearCart(cartId) {
  return request(`/cart/${cartId}`, {
    method: 'DELETE',
  })
}

export async function createCombo(productIds) {
  return request('/combo', {
    method: 'POST',
    body: JSON.stringify({
      productIds,
    }),
  })
}

export async function checkApiHealth() {
  return request('/health')
}