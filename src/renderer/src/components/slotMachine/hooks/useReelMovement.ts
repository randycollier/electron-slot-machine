import { useState } from 'react'

interface UseReelMovementResult {
  reelSymbols: string[]
}

interface UseReelMovementProps {
  reelCount: number
}
const DEFAULT_REEL_COUNT = 3;

const DEFAULT_REEL_SYMBOLS: string[] = [
  '🍎',
  '🍌',
  '🍇',
  '🍓',
  '🍒',
  '🍊',
  '🍋',
  '🍇',
  '🍓',
  '🍒',
  '🍊',
  '🍋'
]

const useReelMovement = ({
  reelCount = DEFAULT_REEL_COUNT
}: UseReelMovementProps): UseReelMovementResult => {
  const [reelSymbols] = useState<string[]>(() => {
    // (_, index) => DEFAULT_REEL_SYMBOLS[Math.floor(Math.random() * DEFAULT_REEL_SYMBOLS.length)])
    return Array(reelCount)
      .fill(null)
      .map((_, index) => DEFAULT_REEL_SYMBOLS[index])
  })

  return {
    reelSymbols
  }
}

export default useReelMovement
