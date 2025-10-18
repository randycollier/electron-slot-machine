import { useCallback, useState } from 'react'
import type { Player, LeaderboardEntry } from '@/types'

interface UsePlayersReturn {
  player: Player | null
  getOrCreatePlayer: (playerName: string) => Promise<Player | null>
  getLeaderboard: () => Promise<LeaderboardEntry[]>
}

const usePlayers = (): UsePlayersReturn => {
  const [player, setPlayer] = useState<Player | null>(null)

  const getOrCreatePlayer = useCallback(async (playerName: string): Promise<Player | null> => {
    try {
      const player = await window.api.getOrCreatePlayer(playerName)
      setPlayer(player)
      return player
    } catch (error) {
      console.error('Error getting or creating player:', error)
      return null
    }
  }, [])

  const getLeaderboard = useCallback(async (): Promise<LeaderboardEntry[]> => {
    try {
      const leaderboard = await window.api.getLeaderboard()
      return leaderboard
    } catch (error) {
      console.error('Error getting leaderboard:', error)
      return []
    }
  }, [])
  // const addTokensToPlayer = useCallback(async (playerId: number, tokens: number): Promise<void> => {
  //   try {
  //     await window.api.addTokensToPlayer(playerId, tokens)
  //   } catch (error) {
  //     console.error('Error adding tokens to player:', error)
  //   }
  // }, [])

  return {
    player,
    getLeaderboard,
    getOrCreatePlayer
  }
}

export default usePlayers
