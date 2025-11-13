import { Product, User } from '@prisma/client'

interface ScoredProduct extends Product {
  score: number
  matchReasons: string[]
}

export function getPersonalizedRecommendations(
  user: User,
  products: Product[],
  limit: number = 12
): ScoredProduct[] {

  const scoredProducts = products.map(product => {
    let score = 0
    const matchReasons: string[] = []

    // Style match (5 points)
    if (user.stylePreference && product.style === user.stylePreference) {
      score += 5
      matchReasons.push('style_match')
    }

    // Color match (3 points per color)
    if (user.colorPreferences && user.colorPreferences.length > 0) {
      const colorMatches = product.colors.filter(color =>
        user.colorPreferences.includes(color)
      )
      if (colorMatches.length > 0) {
        score += colorMatches.length * 3
        matchReasons.push('color_match')
      }
    }

    // Room match (4 points)
    if (user.roomPreferences && user.roomPreferences.includes(product.room)) {
      score += 4
      matchReasons.push('room_match')
    }

    // Budget match (3 points)
    const priceToCheck = product.salePrice || product.price
    if (user.budgetRange) {
      if (
        (user.budgetRange === 'budget' && priceToCheck < 500) ||
        (user.budgetRange === 'mid' && priceToCheck >= 500 && priceToCheck <= 1500) ||
        (user.budgetRange === 'luxury' && priceToCheck > 1500)
      ) {
        score += 3
        matchReasons.push('budget_match')
      }
    }

    // In stock bonus (1 point)
    if (product.inStock) {
      score += 1
    }

    // Sale bonus (2 points)
    if (product.salePrice) {
      score += 2
      matchReasons.push('on_sale')
    }

    return {
      ...product,
      score,
      matchReasons
    }
  })

  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
