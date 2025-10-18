import { useIntl } from 'react-intl'
import '@/assets/slot-reel.css'
const ExitButton = ({ onEndGame }: { onEndGame: () => void }): JSX.Element => {
  const { formatMessage } = useIntl()
  const exitGameButtonText = formatMessage({
    id: 'exitGameButton.exitGameButtonText',
    defaultMessage: 'Exit Game'
  })
  return (
    <button onClick={onEndGame} className="end-game-button" aria-label={exitGameButtonText}>
      {exitGameButtonText}
    </button>
  )
}

export default ExitButton
