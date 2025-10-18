import { useState, useEffect, useCallback } from 'react'
import { usePlayers } from '../hooks'
import Leaderboard from './Leaderboard'
import PlayerLogin from './PlayerLogin'

import type { LeaderboardEntry, Player } from '@/types'
import { useIntl } from 'react-intl'
interface LandingProps {
  onPlayerSelected: (player: Player) => void
}

const Landing = ({ onPlayerSelected }: LandingProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const { getLeaderboard, player, getOrCreatePlayer } = usePlayers()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState<string>('')

  const title = formatMessage({ id: 'landing.title', defaultMessage: 'Slot Machine' })
  const fetchLeaderboard = useCallback(async (): Promise<void> => {
    const leaderboard = await getLeaderboard()
    setLeaderboard(leaderboard)
  }, [getLeaderboard])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  const handleNameChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>): void => {
    const value = evt.target.value.trim()
    setPlayerName(value)
  }, [])

  const submitPlayerName = useCallback(async (): Promise<void> => {
    const currentPlayer = await getOrCreatePlayer(playerName)

    if (currentPlayer) {
      onPlayerSelected(currentPlayer)
    } else {
      console.error('Failed to get or create player')
    }
  }, [getOrCreatePlayer, onPlayerSelected, playerName])

  return (
    <div>
      <h1>{title}</h1>
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
