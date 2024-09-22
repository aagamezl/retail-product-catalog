import { SearchConfig } from '../../config'
import { Product } from '../domains/products'
import { Logger } from './logger'

const damerauLevenshteinDistance = (str1: string, str2: string): number => {
  // Convert both strings to arrays of Unicode code points
  const arr1 = Array.from(str1)
  const arr2 = Array.from(str2)

  const len1 = arr1.length
  const len2 = arr2.length

  // Create a 2D array (matrix) to store distances
  const distanceMatrix = Array.from({ length: len1 + 1 }, () =>
    Array(len2 + 1).fill(0)
  )

  // Initialize the matrix with base cases
  for (let i = 0; i <= len1; i++) {
    distanceMatrix[i][0] = i
  }

  for (let j = 0; j <= len2; j++) {
    distanceMatrix[0][j] = j
  }

  // Iterate over the matrix to fill in the costs
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = arr1[i - 1] === arr2[j - 1] ? 0 : 1

      distanceMatrix[i][j] = Math.min(
        distanceMatrix[i - 1][j] + 1, // Deletion
        distanceMatrix[i][j - 1] + 1, // Insertion
        distanceMatrix[i - 1][j - 1] + cost // Substitution
      )

      // Check for transposition
      if (
        i > 1 &&
        j > 1 &&
        arr1[i - 1] === arr2[j - 2] &&
        arr1[i - 2] === arr2[j - 1]
      ) {
        distanceMatrix[i][j] = Math.min(
          distanceMatrix[i][j],
          distanceMatrix[i - 2][j - 2] + 1 // Transposition
        )
      }
    }
  }

  // Return the calculated Damerau-Levenshtein distance
  return distanceMatrix[len1][len2]
}

// Calculate similarity percentage based on Damerau-Levenshtein distance
function similarityPercentage(s1: string, s2: string) {
  const distance = damerauLevenshteinDistance(s1, s2)
  const maxLen = Math.max(s1.length, s2.length)

  // Similarity percentage formula
  const similarity = ((maxLen - distance) / maxLen) * 100
  return similarity
}

// Soundex function for phonetic encoding
function soundex(s: string) {
  const sUpper = s.toUpperCase()
  const firstLetter = sUpper[0]

  // Soundex encoding rules
  const mappings: Record<string, number> = {
    B: 1,
    F: 1,
    P: 1,
    V: 1,
    C: 2,
    G: 2,
    J: 2,
    K: 2,
    Q: 2,
    S: 2,
    X: 2,
    Z: 2,
    D: 3,
    T: 3,
    L: 4,
    M: 5,
    N: 5,
    R: 6
  }

  let result = firstLetter
  let previousCode = mappings[firstLetter] || ''

  // Loop through the string and map each character to Soundex code
  for (let i = 1; i < sUpper.length; i++) {
    const char = sUpper[i]
    const code = mappings[char] || ''

    if (code !== previousCode && code !== '') {
      result += code
    }

    previousCode = code

    // Stop if the result reaches length of 4
    if (result.length === 4) {
      break
    }
  }

  // Pad with zeroes or truncate to 4 characters
  return (result + '000').slice(0, 4)
}

export const fuzzySearch = (
  products: Product[],
  search: string,
  config: SearchConfig
): Product[] => {
  const matches: Product[] = []

  // Iterate over all products
  products.forEach(product => {
    const productName = product.name /* .toLowerCase() */
    const inputLower = search /* .toLowerCase() */

    // Calculate Damerau-Levenshtein distance
    const distance = damerauLevenshteinDistance(productName, inputLower)

    // Calculate similarity percentage
    const similarity = similarityPercentage(productName, inputLower)

    // Phonetic comparison using Soundex
    const soundexProduct = soundex(productName)
    const soundexInput = soundex(inputLower)

    Logger.info(
      `${productName}: ${distance} ${similarity} ${soundexProduct} ${soundexInput}`
    )

    if (
      similarity >= config.similarity ||
      distance <= config.distance ||
      soundexProduct === soundexInput
    ) {
      matches.push(product)
    }
  })

  // Return the matching product(s)
  return matches
}
