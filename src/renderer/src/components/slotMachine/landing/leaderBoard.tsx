import type { LeaderboardEntry } from '@preload'

interface LeaderBoardProps {
  leaderboard: LeaderboardEntry[]
}

const LeaderBoard = ({ leaderboard }: LeaderBoardProps): JSX.Element | null => {
  if (!leaderboard || leaderboard.length === 0) {
    return null
  }
  return (
    <section>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((player) => (
          <li key={player.name}>
            {player.name} {player.highest_balance} {player.total_spins}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LeaderBoard
