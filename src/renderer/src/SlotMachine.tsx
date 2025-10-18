import { useState, useCallback } from 'react'
import { Landing } from '@/features/player'
import { GameScreen, GameIntroduction } from '@/features/game'
import type { Player } from '@/types'
import useGame from '@/features/game/hooks/useGame'

type GameState = 'landing' | 'introduction' | 'playing'

const SlotMachine = (): JSX.Element => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [gameState, setGameState] = useState<GameState>('landing')
  const { startGame, recordSpin, endGame } = useGame()

  const handlePlayerSelected = (selectedPlayer: Player): void => {
    setPlayer(selectedPlayer)
    setGameState('introduction')
  }
  const isNewPlayer = player?.total_spins === 0 && player?.highest_balance === 0

  const handleStartGame = useCallback(async (): Promise<void> => {
    if (!player) return Promise.resolve()
    const { player_id, highest_balance } = player
    if (!player_id || highest_balance === undefined || highest_balance === null)
      return Promise.resolve()
    try {
      await startGame({ playerId: player_id, startingBalance: highest_balance })
      setGameState('playing')
    } catch (error) {
      console.error('Error starting game:', error)
    }
  }, [player, startGame])

  const gameRoundComplete = useCallback(
    async ({
      symbols,
      betAmount,
      winAmount
    }: {
      symbols: string[]
      betAmount: number
      winAmount: number
    }): Promise<void> => {
     
      try {
        await recordSpin({ symbols: symbols.join(','), betAmount, winAmount })
        await endGame({ endingBalance: 33 })
      } catch (error) {
        console.error('Error recording spin:', error)
      }
    },
    [recordSpin, endGame, player?.highest_balance]
  )

  return (
    <div>
      {gameState === 'landing' && <Landing onPlayerSelected={handlePlayerSelected} />}
      {gameState === 'introduction' && player && (
        <GameIntroduction isNewPlayer={isNewPlayer} player={player} onStartGame={handleStartGame} />
      )}
      {gameState === 'playing' && player && (
        <GameScreen player={player} reelCount={3} onGameRoundComplete={gameRoundComplete} />
      )}
    </div>
  )
}

export default SlotMachine
