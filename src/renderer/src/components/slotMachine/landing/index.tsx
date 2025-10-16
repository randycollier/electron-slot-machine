import { useState, useEffect, useCallback } from 'react'
import { usePlayers } from '../hooks/index'
import LeaderBoard from '@components/slotMachine/landing/leaderBoard'
import type { LeaderboardEntry, Player } from '@preload'
import PlayerLogin from '../landing/playerLogin'
const Landing = ({
  onPlayerSelected
}: {
  onPlayerSelected: (player: Player) => void
}): JSX.Element => {
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
    setPlayerName(value)
  }, [])

  const submitPlayerName = useCallback(async (): Promise<void> => {
    const currentPlayer = await getOrCreatePlayer(playerName)
    onPlayerSelected(currentPlayer)
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
      <LeaderBoard leaderboard={leaderboard} />
    </div>
  )
}

export default Landing
