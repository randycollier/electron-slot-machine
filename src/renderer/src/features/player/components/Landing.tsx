import { useState, useEffect, useCallback } from 'react'
import { usePlayers } from '../hooks'
import Leaderboard from './Leaderboard'
import PlayerLogin from './PlayerLogin'
import type { LeaderboardEntry, Player } from '@/types'

interface LandingProps {
  onPlayerSelected: (player: Player) => void
}

const Landing = ({ onPlayerSelected }: LandingProps): JSX.Element => {
  const { getLeaderboard, player, getOrCreatePlayer } = usePlayers()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState<string>('')

  useEffect(() => {
    const fetchLeaderboard = async (): Promise<void> => {
      const leaderboard = await getLeaderboard()
      setLeaderboard(leaderboard)
    }
    fetchLeaderboard()
  }, [getLeaderboard])

  const handleNameChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim()
    console.log('value', value)
    setPlayerName(value)
  }, [])

  const submitPlayerName = useCallback(async (): Promise<void> => {

    const currentPlayer = await getOrCreatePlayer(playerName)
    console.log('currentPlayer', currentPlayer)
   
    if (currentPlayer) {
      onPlayerSelected(currentPlayer)
    } else {
      console.error('Failed to get or create player')
    }
  }, [getOrCreatePlayer, onPlayerSelected, playerName])

  return (
    <div>
      <h1>Slot Machine</h1>
      <PlayerLogin
        player={player}
        playerName={playerName}
        handleNameChange={handleNameChange}
        submitPlayerName={submitPlayerName}
      />
      <Leaderboard leaderboard={leaderboard} />
    </div>
  )
}

export default Landing
