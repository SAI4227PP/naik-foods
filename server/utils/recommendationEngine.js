const MAX_RECOMMENDATIONS = 6

function normalize(value = '') {
  return String(value).trim().toLowerCase()
}

function getTags(product) {
  if (!Array.isArray(product.tags)) {
    return []
  }

  return product.tags.map(normalize)
}

function calculateScore(sourceProduct, candidate) {
  let score = 0

  // Same category
  if (
    normalize(sourceProduct.category) &&
    normalize(sourceProduct.category) === normalize(candidate.category)
  ) {
    score += 40
  }

  // Same region
  if (
    normalize(sourceProduct.region) &&
    normalize(sourceProduct.region) === normalize(candidate.region)
  ) {
    score += 20
  }

  // Matching tags
  const sourceTags = getTags(sourceProduct)
  const candidateTags = getTags(candidate)

  const matchingTags = sourceTags.filter((tag) =>
    candidateTags.includes(tag),
  )

  score += matchingTags.length * 10

  // Similar price range
  if (sourceProduct.price > 0 && candidate.price > 0) {
    const priceDifference = Math.abs(
      sourceProduct.price - candidate.price,
    )

    const averagePrice =
      (sourceProduct.price + candidate.price) / 2

    if (averagePrice > 0) {
      const differencePercentage =
        priceDifference / averagePrice

      if (differencePercentage <= 0.2) {
        score += 15
      } else if (differencePercentage <= 0.4) {
        score += 8
      }
    }
  }

  // Rating boost
  if (candidate.rating >= 4) {
    score += 5
  }

  // Review activity boost
  if (candidate.reviewCount >= 10) {
    score += 3
  }

  return score
}

export function generateRecommendations(
  availableProducts,
  cartProducts,
  limit = MAX_RECOMMENDATIONS,
) {
  if (
    !Array.isArray(availableProducts) ||
    !Array.isArray(cartProducts) ||
    cartProducts.length === 0
  ) {
    return []
  }

  const recommendations = availableProducts
    .map((candidate) => {
      let bestScore = 0

      for (const cartProduct of cartProducts) {
        const score = calculateScore(cartProduct, candidate)

        if (score > bestScore) {
          bestScore = score
        }
      }

      return {
        product: candidate,
        score: bestScore,
      }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      if (b.product.rating !== a.product.rating) {
        return b.product.rating - a.product.rating
      }

      return b.product.reviewCount - a.product.reviewCount
    })
    .slice(0, Math.min(Number(limit) || MAX_RECOMMENDATIONS, MAX_RECOMMENDATIONS))

  return recommendations.map((item) => ({
    ...item.product.toObject(),
    recommendationScore: item.score,
  }))
}

export default generateRecommendations