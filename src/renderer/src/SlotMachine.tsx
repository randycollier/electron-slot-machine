import { Landing } from '@/features/player'
import { GameScreen, GameIntroduction } from '@/features/game'
import { COST_PER_SPIN } from '@/utils/constants'
import { useSlotMachineGame } from '@/hooks'
import './assets/slot-machine.css'
const SlotMachine = (): JSX.Element => {
  const {
    player,
    gameState,
    balance,
    handlePlayerSelected,
    handleStartGame,
    handleSpinStart,
    handleGameRoundComplete,
    handleEndGame,
    handleResetGame
  } = useSlotMachineGame()

  return (
    <div className="">
      <div className="slot-machine">
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
            onResetGame={handleResetGame}
          />
        )}
      </div>
    </div>
  )
}

export default SlotMachine
