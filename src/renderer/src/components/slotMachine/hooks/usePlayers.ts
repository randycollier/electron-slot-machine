import { useCallback, useState } from 'react'
import type { Player, LeaderboardEntry } from '@preload'

type UsePlayersReturn = {
  players: Player[]
  getLeaderboard: () => Promise<LeaderboardEntry[]>
}

const usePlayers = (): UsePlayersReturn => {
  const [players] = useState<Player[]>([])

  const getLeaderboard = useCallback(async (): Promise<LeaderboardEntry[]> => {
    try {
      const leaderboard = await window.api.getLeaderboard()
      return leaderboard
    } catch (error) {
      console.error('Error getting leaderboard:', error)
      return []
    }
  }, [])

  return {
    players,
    getLeaderboard
  } as const
}

export default usePlayers
