import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { DEFAULT_REEL_COUNT, COST_PER_SPIN } from '@/utils/constants'
import Reels from './Reels'
import PlayerInfo from './PlayerInfo'
import SpinButton from './SpinButton'
import useReels from '@/features/game/hooks/useReels'
import ResetButton from './ResetButton'
import ExitButton from './ExitButton'
import type { Player } from '@/types'
import '@/assets/slot-machine.css'
import HowToPlay from './HowToPlay'
// ============================================================================
// Types
// ============================================================================

interface GameScreenProps {
  balance: number
  player: Player
  costPerSpin?: number
  reelCount?: number
  onSpinStart: () => void
  onGameRoundComplete: (result: { symbols: string[] }) => Promise<void>
  onEndGame: () => Promise<void>
  onResetGame: () => void
}

// ============================================================================
// Helper Functions
// ============================================================================

const canAffordSpin = (balance: number, costPerSpin: number): boolean => {
  return balance >= costPerSpin
}

// ============================================================================
// Main Component
// ============================================================================

const GameScreen = ({
  player,
  balance,
  costPerSpin = COST_PER_SPIN,
  reelCount = DEFAULT_REEL_COUNT,
  onSpinStart,
  onGameRoundComplete,
  onResetGame,
  onEndGame
}: GameScreenProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const { isSpinning, spin, reels } = useReels({ reelCount })

  // Translations
  const translations = useMemo(
    () => ({
      title: formatMessage({ id: 'gameScreen.title', defaultMessage: 'Slot Machine' }),
      insufficientFunds: formatMessage({
        id: 'gameScreen.insufficientFunds',
        defaultMessage: 'Insufficient balance - Game Over!'
      }),
      endGame: formatMessage({ id: 'gameScreen.endGameButton', defaultMessage: 'End Game' })
    }),
    [formatMessage]
  )

  // Game state
  const canSpin = useMemo(() => canAffordSpin(balance, costPerSpin), [balance, costPerSpin])
  const showInsufficientFunds = !canSpin && !isSpinning

  // Handlers
  const handleSpin = async (): Promise<void> => {
    try {
      onSpinStart()
      const outcome = await spin()
      await onGameRoundComplete({ symbols: outcome })
    } catch (error) {
      console.error('Error during spin:', error)
    }
  }

  return (
    <div className="game-screen">
      <header>
        <h1>🎰 {translations.title} 🎰</h1>
      </header>
     

      <PlayerInfo name={player.name} balance={balance} />

      <div className="game-content">
        <Reels reels={reels} />
      </div>

      <footer className="game-controls">
        <SpinButton
          handleSpin={handleSpin}
          canSpin={canSpin}
          isSpinning={isSpinning}
          costPerSpin={costPerSpin}
        />
       <ExitButton onEndGame={onEndGame} />
        {showInsufficientFunds && (
          <>
            <p className="insufficient-funds">{translations.insufficientFunds}</p>
            <ResetButton handleReset={onResetGame} />
          </>
        )}
        <HowToPlay />
      </footer>
    </div>
  )
}

export default GameScreen
