import { useState, useCallback, useRef, useEffect } from 'react'
import {
  DEFAULT_REEL_COUNT,
  DEFAULT_REEL_SYMBOLS,
  SPIN_INTERVAL,
  SPIN_DURATION,
  DEFAULT_INITIAL_REEL_SYMBOL
} from '@/utils/constants'

interface UseReelsProps {
  reelCount?: number
  symbols?: string[]
  randomGenerator?: () => number
}

interface ReelState {
  symbol: string
  isSpinning: boolean
}

interface UseReelsReturn {
  reels: ReelState[]
  isSpinning: boolean
  spin: () => Promise<string[]>
  results: string[] | null
}

// Helper function to select a random symbol - extracted for testability
export const selectRandomSymbol = (symbols: string[], randomFn: () => number = Math.random): string => {
  return symbols[Math.floor(randomFn() * symbols.length)]
}

// Helper function to generate final results - extracted for testability
export const generateFinalResults = (
  count: number,
  symbols: string[],
  randomFn: () => number = Math.random
): string[] => {
  return Array(count)
    .fill(null)
    .map(() => selectRandomSymbol(symbols, randomFn))
}

const useReels = ({
  reelCount = DEFAULT_REEL_COUNT,
  symbols = DEFAULT_REEL_SYMBOLS,
  randomGenerator = Math.random
}: UseReelsProps = {}): UseReelsReturn => {
  const [reels, setReels] = useState<ReelState[]>(() =>
    Array(reelCount).fill({ symbol: DEFAULT_INITIAL_REEL_SYMBOL, isSpinning: false })
  )
  const [results, setResults] = useState<string[] | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  const spin = useCallback(async (): Promise<string[]> => {
    // Generate random results upfront using the injected random generator
    const finalResults = generateFinalResults(reelCount, symbols, randomGenerator)

    setIsSpinning(true)
    setResults(null)

    intervalRef.current = setInterval(() => {
      setReels((prevReels) =>
        prevReels.map((reel) => ({
          ...reel,
          symbol: selectRandomSymbol(symbols, randomGenerator)
        }))
      )
    }, SPIN_INTERVAL)

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setIsSpinning(false)
      setResults(finalResults)
    }, SPIN_DURATION)

    return finalResults
  }, [reelCount, symbols, randomGenerator])

  return {
    reels,
    isSpinning,
    spin,
    results
  }
}

export default useReels
