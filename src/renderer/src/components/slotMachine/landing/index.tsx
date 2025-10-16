import { useState, useEffect} from 'react'
import { usePlayers } from '../hooks/index'
import { LeaderboardEntry } from '@preload'
type LandingProps = {
  startGame: (playerName: string) => void
}
const Landing = ({ startGame }: LandingProps): JSX.Element => {
  const [playerName, setPlayerName] = useState<string>('');
  const { getLeaderboard } = usePlayers();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchLeaderboard = async (): Promise<void> => {
      const leaderboard = await getLeaderboard()
      setLeaderboard(leaderboard)
    }
    fetchLeaderboard()
  }, [getLeaderboard]);

  
  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(evt.target.value);
  }
  const handleStart = (): void => {
    startGame(playerName)
  }

  return (
    <div>
      <h1>Slot Machine</h1>
      <h2>Enter your name</h2>
      <input type="text" value={playerName} onChange={handleNameChange} />
      <button onClick={handleStart}>Start</button>
      {leaderboard.length > 0 && (
        <section>
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard?.length > 0 && leaderboard?.map((player) => (
              <li key={player.player_id}>{player.name} {player.highest_balance} {player.total_spins}</li>
            ))}
          </ul>
        </section>
      )}
     
    </div>
  )
}

export default Landing
