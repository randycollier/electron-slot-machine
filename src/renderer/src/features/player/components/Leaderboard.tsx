import type { LeaderboardEntry } from '@/types'

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[]
}

const Leaderboard = ({ leaderboard }: LeaderboardProps): JSX.Element | null => {
  if (!leaderboard || leaderboard.length === 0) {
    return null
  }
  return (
    <section>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.name}>
            {player.name} - Balance: {player.highest_balance} - Spins: {player.total_spins}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Leaderboard
