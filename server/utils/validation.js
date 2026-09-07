export const isValidObjectId = (id) => {
  if (!id || typeof id !== 'string') {
    return false
  }

  return /^[a-f\d]{24}$/i.test(id.trim())
}

export const validateQuantity = (quantity) => {
  const parsedQuantity = Number(quantity)

  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity < 1
  ) {
    return null
  }

  return parsedQuantity
}

export const validateSessionId = (sessionId) => {
  if (
    !sessionId ||
    typeof sessionId !== 'string'
  ) {
    return false
  }

  return sessionId.trim().length >= 3
}

export const sanitizeSearch = (value = '') => {
  return String(value)
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}