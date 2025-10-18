import { memo } from 'react'
import type { Player } from '@/types'

interface PlayerLoginProps {
  playerName: string
  player: Player | null
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  submitPlayerName: () => Promise<void>
}

const PlayerLogin = ({
  playerName,
  handleNameChange,
  submitPlayerName
}: PlayerLoginProps): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    submitPlayerName()
  }
  return (
    <section>
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Player Name</label>
        <input id="playerName" type="text" value={playerName} onChange={handleNameChange} />
        <button disabled={!playerName} type="submit">
          Start
        </button>
      </form>
    </section>
  )
}
export default memo(PlayerLogin)
