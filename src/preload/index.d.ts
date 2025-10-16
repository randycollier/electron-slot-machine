import { ElectronAPI } from '@electron-toolkit/preload'

interface Player {
  player_id: number
  name: string
  created_at: string
  highest_balance: number
  total_spins: number
}

interface Game {
  game_id: number
  player_id: number
  start_time: string
  end_time: string | null
  starting_balance: number
  ending_balance: number | null
}

interface Spin {
  spin_id: number
  game_id: number
  timestamp: string
  symbols: string
  bet_amount: number
  win_amount: number
}

interface LeaderboardEntry {
  name: string
  highest_balance: number
  total_spins: number
}

interface Window {
  api: {
    getOrCreatePlayer: (playerName: string) => Promise<Player>
    getNumberOfGamesPlayed: (playerId: number) => Promise<{ count: number }>
    startGame: (playerId: number, startingBalance: number) => Promise<{ gameId: number }>
    endGame: (gameId: number, endingBalance: number) => Promise<void>
    recordSpin: (
      gameId: number,
      symbols: string,
      betAmount: number,
      winAmount: number
    ) => Promise<{ spinId: number }>
    getLeaderboard: () => Promise<LeaderboardEntry[]>
  }
}



declare global {
  interface Window {
    electron: ElectronAPI
    api: Window.api
  }
}
