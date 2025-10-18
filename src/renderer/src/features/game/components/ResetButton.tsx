import { useIntl } from 'react-intl'
import '@/assets/slot-reel.css'
interface ResetButtonProps {
  handleReset: () => void
}

const ResetButton = ({ handleReset }: ResetButtonProps): JSX.Element => {
  const { formatMessage } = useIntl()

  const resetGameButtonText = formatMessage({
    id: 'resetButton.resetGameButtonText',
    defaultMessage: 'Reset Game'
  })

  return (
    <button onClick={handleReset} className="reset-button" aria-label={resetGameButtonText}>
      {resetGameButtonText}
    </button>
  )
}

export default ResetButton
