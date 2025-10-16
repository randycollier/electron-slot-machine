import Reels from './reels/Reels'
import Landing from './landing'
import { useState } from 'react'
import type { Player } from '@preload'
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
  const [player, setPlayer] = useState<Player | null>(null)
  return (
    <div>
      {player ? (
        <SlotMachineContent playerName={player.name} />
      ) : (
        <Landing onPlayerSelected={setPlayer} />
      )}
    </div>
  )
}

export default SlotMachine
