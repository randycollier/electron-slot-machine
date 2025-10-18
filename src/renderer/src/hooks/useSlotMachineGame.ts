import { useState, useCallback, useEffect, useRef } from 'react'
import { useGame } from '@/features/game/hooks'
import { usePlayers } from '@/features/player/hooks'
import { COST_PER_SPIN, DEFAULT_STARTING_BALANCE, WIN_AMOUNT_MAP } from '@/utils/constants'
import type { Player } from '@/types'

type GameState = 'landing' | 'introduction' | 'playing'

interface UseSlotMachineGameReturn {
  player: Player | null
  gameState: GameState
  balance: number
  gameId: number | null
  handlePlayerSelected: (player: Player) => void
  handleStartGame: () => Promise<void>
  handleSpinStart: () => void
  handleGameRoundComplete: (result: { symbols: string[] }) => Promise<void>
  handleEndGame: () => Promise<void>
}

export const useSlotMachineGame = (): UseSlotMachineGameReturn => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [gameState, setGameState] = useState<GameState>('landing')
  const [balance, setBalance] = useState<number>(DEFAULT_STARTING_BALANCE)
  const { startGame, recordSpin, endGame, gameId } = useGame()
  const { getOrCreatePlayer } = usePlayers()
  const cleanupInProgressRef = useRef(false)

  // ============================================================================
  // Game Actions
  // ============================================================================

  const handlePlayerSelected = useCallback((selectedPlayer: Player): void => {
    setPlayer(selectedPlayer)
    setGameState('introduction')
  }, [])

  const handleStartGame = useCallback(async (): Promise<void> => {
    setBalance(DEFAULT_STARTING_BALANCE)
    if (!player) return Promise.resolve()

    const { player_id, highest_balance } = player
    if (!player_id || highest_balance === undefined || highest_balance === null) {
      return Promise.resolve()
    }

    try {
      await startGame({ playerId: player_id, startingBalance: highest_balance })
      setGameState('playing')
    } catch (error) {
      console.error('Error starting game:', error)
    }
  }, [player, startGame])

  const handleSpinStart = useCallback((): void => {
    // Deduct the cost immediately when spin starts
    setPlayer((prev) => {
      if (!prev) return null
      return { ...prev, highest_balance: prev.highest_balance - COST_PER_SPIN }
    })
  }, [])

  const calculateWinAmount = useCallback((symbols: string[]): number => {
    const symbolString = symbols.join('')
    return WIN_AMOUNT_MAP[symbolString] || 0
  }, [])

  const handleGameRoundComplete = useCallback(
    async ({ symbols }: { symbols: string[] }): Promise<void> => {
      try {
        if (!player || !player.name) return

        const winAmount = calculateWinAmount(symbols)

        // Record the spin in the database (gameId persists across spins)
        await recordSpin({ symbols: symbols.join(','), betAmount: COST_PER_SPIN, winAmount })

        // Update balance
        const finalBalance = balance + winAmount - COST_PER_SPIN
        setBalance(finalBalance)
      } catch (error) {
        console.error('Error recording spin:', error)
      }
    },
    [player, calculateWinAmount, recordSpin, balance]
  )

  const handleEndGame = useCallback(async (): Promise<void> => {
    if (!player) return

    try {
      await endGame({ endingBalance: balance })

      // Refresh player data from database
      const updatedPlayer = await getOrCreatePlayer(player.name)
      if (updatedPlayer) {
        setPlayer(updatedPlayer)
      }

      setGameState('landing')
    } catch (error) {
      console.error('Error ending game:', error)
    }
  }, [player, endGame, balance, getOrCreatePlayer])

  // ============================================================================
  // Cleanup Logic - Auto-save on app close
  // ============================================================================

  useEffect(() => {
    const cleanupGame = async (): Promise<void> => {
      // Prevent multiple cleanup calls
      if (cleanupInProgressRef.current) return
      cleanupInProgressRef.current = true

      if (gameState === 'playing' && player && gameId) {
        try {
          await endGame({ endingBalance: balance })
        } catch (error) {
          console.error('Error auto-saving game on exit:', error)
        }
      }
    }

    // Handle Electron app closing event (from main process)
    const handleAppClosing = (): void => {
      console.info('Received app-closing signal from main process')
      cleanupGame()
    }

    // Handle browser/app close
    const handleBeforeUnload = (e: BeforeUnloadEvent): void => {
      if (gameState === 'playing' && gameId) {
        e.preventDefault()
        cleanupGame()
      }
    }

    // Listen for Electron IPC event (returns cleanup function)
    const removeAppClosingListener = window.api?.onAppClosing?.(handleAppClosing)

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup on component unmount
    return (): void => {
      if (removeAppClosingListener) {
        removeAppClosingListener()
      }
      window.removeEventListener('beforeunload', handleBeforeUnload)
      cleanupGame()
    }
  }, [gameState, player, gameId, endGame, balance])

  return {
    player,
    gameState,
    balance,
    gameId,
    handlePlayerSelected,
    handleStartGame,
    handleSpinStart,
    handleGameRoundComplete,
    handleEndGame
  }
}
