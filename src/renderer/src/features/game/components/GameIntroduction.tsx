import type { Player } from '@/types'
import { DEFAULT_STARTING_BALANCE } from '@/utils/constants'
import { useIntl } from 'react-intl'

interface GameIntroductionProps {
  player: Player
  onStartGame: () => void
}

const GameIntroduction = ({ player, onStartGame }: GameIntroductionProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const welcomeMessage = formatMessage(
    {
      id: 'introduction.welcome',
      defaultMessage: 'Welcome, {name}!'
    },
    { name: player.name }
  )
  const startingBalance = formatMessage(
    {
      id: 'introduction.startingBalance',
      defaultMessage: '{balance} Credits'
    },
    { balance: DEFAULT_STARTING_BALANCE }
  )
  const goodLuckMessage = formatMessage({
    id: 'introduction.goodLuck',
    defaultMessage: 'Good luck spinning the reels!'
  })
  const startGameButtonText = formatMessage({
    id: 'introduction.startGameButton',
    defaultMessage: 'Start Playing'
  })
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div>
        <h1>{welcomeMessage} 🎰</h1>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '2rem 0', color: '#4CAF50' }}>
          {startingBalance}
        </div>
        <p style={{ margin: '1rem 0' }}>{goodLuckMessage}</p>
      </div>

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
        {startGameButtonText}
      </button>
    </div>
  )
}

export default GameIntroduction
