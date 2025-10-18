import { useState, useCallback } from 'react'
import { DEFAULT_STARTING_BALANCE } from '@/utils/constants'

interface UseGameReturn {
  gameId: number | null
  balance: number

  startGame: ({
    playerId,
    startingBalance
  }: {
    playerId: number
    startingBalance: number
  }) => Promise<{ gameId: number | null }>
  endGame: ({ endingBalance }: { endingBalance: number }) => Promise<void>
  recordSpin: ({
    symbols,
    betAmount,
    winAmount
  }: {
    symbols: string
    betAmount: number
    winAmount: number
  }) => Promise<void>
}

const useGame = (): UseGameReturn => {
  const [gameId, setGameId] = useState<number | null>(null)
  const [balance, setBalance] = useState(DEFAULT_STARTING_BALANCE)

  const startGame = useCallback(
    async ({ playerId, startingBalance }: { playerId: number; startingBalance: number }) => {
      try {
        console.log(
          'Starting game for player:',
          playerId,
          'with starting balance:',
          startingBalance
        )
        const result = await window.api.startGame(playerId, startingBalance)
        setGameId(result.gameId)
        setBalance(startingBalance)
        return { gameId: result.gameId }
      } catch (error) {
        console.error('Error starting game:', error)
        return { gameId: null }
      }
    },
    []
  )

  const endGame = useCallback(
    async ({ endingBalance }: { endingBalance: number }) => {
      if (gameId) {
        try {
          await window.api.endGame(gameId, endingBalance)
          setGameId(null)
        } catch (error) {
          console.error('Error ending game:', error)
        }
      }
    },
    [gameId]
  )

  const recordSpin = useCallback(
    async ({
      symbols,
      betAmount,
      winAmount
    }: {
      symbols: string
      betAmount: number
      winAmount: number
    }) => {
      if (gameId) {
        try {
          await window.api.recordSpin(gameId, symbols, betAmount, winAmount)
        } catch (error) {
          console.error('Error recording spin:', error)
        }
      }
    },
    [gameId]
  )

  return {
    gameId,
    balance,
    startGame,
    endGame,
    recordSpin
  }
}

export default useGame
