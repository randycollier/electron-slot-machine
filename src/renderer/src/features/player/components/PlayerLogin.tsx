import { memo } from 'react'
import type { Player } from '@/types'
import { useIntl } from 'react-intl'
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
  const { formatMessage } = useIntl()
  const placeholder = formatMessage({
    id: 'playerLogin.placeholder',
    defaultMessage: 'Enter your name'
  })
  const submit = formatMessage({ id: 'playerLogin.submit', defaultMessage: 'Start Playing' })
  const playerNameLabel = formatMessage({
    id: 'playerLogin.playerNameLabel',
    defaultMessage: 'Player Name'
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    submitPlayerName()
  }
  return (
    <section>
      <h2>Enter your name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">{playerNameLabel}</label>
        <input
          placeholder={placeholder}
          id="playerName"
          type="text"
          value={playerName}
          onChange={handleNameChange}
        />
        <button disabled={!playerName} type="submit">
          {submit}
        </button>
      </form>
    </section>
  )
}
export default memo(PlayerLogin)
