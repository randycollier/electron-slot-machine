
import { DEFAULT_REEL_COUNT } from '@/utils/constants'
import Reels from './Reels'
import useReels from '@/features/game/hooks/useReels'
import type { Player } from '@/types'
import { COST_PER_SPIN } from '@/utils/constants'

interface GameScreenProps {
  player: Player
  reelCount?: number
  onGameRoundComplete: ({
    symbols,
    betAmount,
    winAmount
  }: {
    symbols: string[]
    betAmount: number
    winAmount: number
  }) => Promise<void>
}

const GameScreen = ({
  player,
  reelCount = DEFAULT_REEL_COUNT,
  onGameRoundComplete
}: GameScreenProps): JSX.Element => {
  const { isSpinning, spin, reels } = useReels({ reelCount })

  const handleSpin = async (): Promise<void> => {
    const outcome = await spin()
    onGameRoundComplete({ symbols: outcome, betAmount: 1, winAmount: 0 })
  }

  return (
    <div>
      <h1>🎰 Slot Machine 🎰</h1>
      <h2>Player: {player.name}</h2>
      <h3>Balance: {player.highest_balance}</h3>
      <Reels reels={reels} />
      <button onClick={handleSpin} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : `Spin (${COST_PER_SPIN} Credits)`}
      </button>
    </div>
  )
}

export default GameScreen
