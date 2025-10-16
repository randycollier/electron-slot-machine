import {memo} from 'react'
import type { Player } from '@preload'

interface PlayerLoginProps {
  playerName: string
  player: Player | null
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  submitPlayerName: () => Promise<void>
}

const PlayerLogin = ({
  player,
  playerName,
  handleNameChange,
  submitPlayerName
}: PlayerLoginProps): JSX.Element => {
  return (
    <section>
      <h2>Enter your name</h2>
      <form>
        <label htmlFor="playerName">Player Name</label>
        <input id="playerName" type="text" value={playerName} onChange={handleNameChange} />
        <button disabled={!playerName} type="button" onClick={submitPlayerName}>
          Start
        </button>
      </form>

      {player && (
        <div>
          <h2>Welcome, {player.name || 'Player'}</h2>
        </div>
      )}
    </section>
  )
}

export default memo(PlayerLogin)
