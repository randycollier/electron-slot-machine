import type { LeaderboardEntry } from '@/types'
import { useIntl } from 'react-intl'

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

const Leaderboard = ({ leaderboard }: LeaderboardProps): JSX.Element | null => {
  const { formatMessage } = useIntl()
  const topPlayers = formatMessage(
    { id: 'leaderboard.topPlayers', defaultMessage: '{count} Top Players' },
    { count: 3 }
  )
  const player = formatMessage({ id: 'leaderboard.player', defaultMessage: 'Player' })
  const noPlayers = formatMessage({
    id: 'leaderboard.noPlayers',
    defaultMessage: 'No players yet. Be the first!'
  })
  const rank = formatMessage({ id: 'leaderboard.rank', defaultMessage: 'Rank' })
  const totalSpins = formatMessage({ id: 'leaderboard.totalSpins', defaultMessage: 'Total Spins' })
  const highestBalance = formatMessage({
    id: 'leaderboard.highestBalance',
    defaultMessage: 'Highest Balance'
  })

  if (!leaderboard || leaderboard.length === 0) {
    return null
  }

  // Get only the top 3 players
  const topThreePlayers = leaderboard.slice(0, 3)

  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h3>🏆 {topPlayers}</h3>
        {topThreePlayers.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>{rank}</th>
                <th>{player}</th>
                <th>{highestBalance}</th>
                <th>{totalSpins}</th>
              </tr>
            </thead>
            <tbody>
              {topThreePlayers.map((entry, index) => (
                <tr key={index}>
                  <td className="rank">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td>{entry.name}</td>
                  <td>{entry.highest_balance}</td>
                  <td>{entry.total_spins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{noPlayers}</p>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
