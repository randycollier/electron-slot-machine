import type { LeaderboardEntry } from '@/types'
import { useIntl } from 'react-intl'

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

const Leaderboard = ({ leaderboard }: LeaderboardProps): JSX.Element | null => {
  const { formatMessage } = useIntl()
  const leaderboardTitle = formatMessage({ id: 'leaderboard.title', defaultMessage: 'Leaderboard' })
  const highestBalance = formatMessage({
    id: 'leaderboard.highestBalance',
    defaultMessage: 'Highest Balance'
  })
  const spins = formatMessage({ id: 'leaderboard.spins', defaultMessage: 'Spins' })
  if (!leaderboard || leaderboard.length === 0) {
    return null
  }
  return (
    <section>
      <h2>{leaderboardTitle}</h2>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.name}>
            {player.name} - {highestBalance}: {player.highest_balance} - {spins}:{' '}
            {player.total_spins}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
