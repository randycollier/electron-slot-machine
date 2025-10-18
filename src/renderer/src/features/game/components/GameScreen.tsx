import { DEFAULT_REEL_COUNT, COST_PER_SPIN } from '@/utils/constants'
import Reels from './Reels'
import PlayerInfo from './PlayerInfo'
import useReels from '@/features/game/hooks/useReels'
import type { Player } from '@/types'
import { useIntl } from 'react-intl'
import SpinButton from './SpinButton'
// ============================================================================
// Types
// ============================================================================

interface GameScreenProps {
  /** The current balance in credits */
  balance: number
  /** The current player information */
  player: Player
  /** Cost per spin in credits (default: COST_PER_SPIN) */
  costPerSpin?: number
  /** Number of reels to display (default: DEFAULT_REEL_COUNT) */
  reelCount?: number
  /** Callback when spin starts (deducts cost from balance) */
  onSpinStart: () => void
  /** Callback when a game round completes with the resulting symbols */
  onGameRoundComplete: (result: { symbols: string[] }) => Promise<void>
  /** Callback when player ends the game */
  onEndGame: () => Promise<void>
}



const canAffordSpin = (balance: number, costPerSpin: number): boolean => {
  return balance >= costPerSpin
}


const GameScreen = ({
  player,
  balance,
  costPerSpin = COST_PER_SPIN,
  reelCount = DEFAULT_REEL_COUNT,
  onSpinStart,
  onGameRoundComplete,
  onEndGame
}: GameScreenProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'gameScreen.title', defaultMessage: 'Slot Machine' })
  const insufficientFundsText = formatMessage({
    id: 'gameScreen.insufficientFunds',
    defaultMessage: 'Insufficient balance - Game Over!'
  })
  const endGameButtonText = formatMessage({
    id: 'gameScreen.endGameButton',
    defaultMessage: 'End Game'
  })
  const { isSpinning, spin, reels } = useReels({ reelCount })

  const handleSpin = async (): Promise<void> => {
    try {
      // Deduct the cost immediately
      onSpinStart()
      // Then spin the reels
      const outcome = await spin()
      // Finally process the results
      await onGameRoundComplete({ symbols: outcome })
    } catch (error) {
      console.error('Error during spin:', error)
      // You might want to add error handling UI here
    }
  }


  return (
    <div className="game-screen">
      <header className="game-header">
        <h1>🎰 {title} 🎰</h1>
      </header>

      <PlayerInfo name={player.name} balance={balance} />

      <div className="game-content">
        <Reels reels={reels} />
      </div>

      <footer className="game-controls">
        <SpinButton
          handleSpin={handleSpin}
          canSpin={canAffordSpin(balance, costPerSpin)}
          isSpinning={isSpinning}
          costPerSpin={costPerSpin}
        />
        {!canAffordSpin(balance, costPerSpin) && !isSpinning && (
          <p className="insufficient-funds">{insufficientFundsText}</p>
        )}
        <button
          onClick={onEndGame}
          disabled={isSpinning}
          className="end-game-button"
          aria-label={endGameButtonText}
        >
          {endGameButtonText}
        </button>
      </footer>
    </div>
  )
}

export default GameScreen
