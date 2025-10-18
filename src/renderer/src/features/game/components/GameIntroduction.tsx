import type { Player } from '@/types'
import { DEFAULT_STARTING_BALANCE } from '@/utils/constants'

interface GameIntroductionProps {
  player: Player
  isNewPlayer: boolean
  onStartGame: () => void
}

const GameIntroduction = ({
  player,
  onStartGame,
  isNewPlayer = true
}: GameIntroductionProps): JSX.Element => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {isNewPlayer ? (
        <div>
          <h1>Welcome, {player.name}! 🎰</h1>
          <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
            You&apos;re a new player! Get started with:
          </p>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '2rem 0', color: '#4CAF50' }}>
            {DEFAULT_STARTING_BALANCE} Credits
          </div>
          <p style={{ margin: '1rem 0' }}>Good luck spinning the reels!</p>
        </div>
      ) : (
        <div>
          <h1>Welcome Back, {player.name}! 🎰</h1>
          <div style={{ margin: '2rem 0' }}>
            <h2>Your Stats</h2>
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                margin: '1.5rem 0'
              }}
            >
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3' }}>
                  {player.highest_balance}
                </div>
                <div style={{ color: '#666' }}>Games Played</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>
                  {player.highest_balance}
                </div>
                <div style={{ color: '#666' }}>Highest Balance</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0' }}>
                  {player.total_spins}
                </div>
                <div style={{ color: '#666' }}>Total Spins</div>
              </div>
            </div>
            <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>
              Starting with: <strong>{DEFAULT_STARTING_BALANCE} Credits</strong>
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onStartGame}
        style={{
          marginTop: '2rem',
          padding: '1rem 3rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        Start Playing
      </button>
    </div>
  )
}

export default GameIntroduction
