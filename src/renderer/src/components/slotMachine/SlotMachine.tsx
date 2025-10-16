import Reels from './reels/Reels'
import Landing from './landing'
import { useState } from 'react'
const SlotMachineContent = ({ playerName }: { playerName: string }): JSX.Element => {
  return (
    <div>
      <h1>Slot Machine</h1>
      <h2>Player: {playerName}</h2>
      <Reels reelCount={8} />
    </div>
  )
}
const SlotMachine = (): JSX.Element => {
  const [playerName, setPlayerName] = useState<string>('')
  return (
    <div>
      {playerName ? (
        <SlotMachineContent playerName={playerName} />
      ) : (
        <Landing startGame={setPlayerName} />
      )}
    </div>
  )
}

export default SlotMachine
