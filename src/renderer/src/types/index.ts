// Re-export types from preload
export type { Player, LeaderboardEntry, Game, Spin } from '@preload'

// Game-specific types
export interface GameState {
  gameId: number | null
  balance: number
  isSpinning: boolean
  lastWin: number
}

export interface SpinResult {
  symbols: string[]
  winAmount: number
}

export interface ReelState {
  symbols: string[]
  isSpinning: boolean
}
