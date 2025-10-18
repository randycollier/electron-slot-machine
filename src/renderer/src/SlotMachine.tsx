import { Landing } from '@/features/player'
import { GameScreen, GameIntroduction } from '@/features/game'
import { COST_PER_SPIN } from '@/utils/constants'
import { useSlotMachineGame } from '@/hooks'

const SlotMachine = (): JSX.Element => {
  const {
    player,
    gameState,
    balance,
    handlePlayerSelected,
    handleStartGame,
    handleSpinStart,
    handleGameRoundComplete,
    handleEndGame
  } = useSlotMachineGame()

  return (
    <div>
      {gameState === 'landing' && <Landing onPlayerSelected={handlePlayerSelected} />}
      {gameState === 'introduction' && player && (
        <GameIntroduction player={player} onStartGame={handleStartGame} />
      )}
      {gameState === 'playing' && player && (
        <GameScreen
          player={player}
          costPerSpin={COST_PER_SPIN}
          reelCount={3}
          balance={balance}
          onSpinStart={handleSpinStart}
          onGameRoundComplete={handleGameRoundComplete}
          onEndGame={handleEndGame}
        />
      )}
    </div>
  )
}

export default SlotMachine
