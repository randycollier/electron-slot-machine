import { useIntl } from 'react-intl'

interface SpinButtonProps {
  handleSpin: () => void
  canSpin: boolean
  isSpinning: boolean
  costPerSpin: number
}

const SpinButton = ({
  handleSpin,
  canSpin,
  isSpinning,
  costPerSpin
}: SpinButtonProps): JSX.Element => {
  const { formatMessage } = useIntl()

  const spinningText = formatMessage({
    id: 'spinButton.spinning',
    defaultMessage: 'Spinning...'
  })
  const spinButtonText = formatMessage(
    {
      id: 'spinButton.spin',
      defaultMessage: 'Spin'
    },
    { costPerSpin }
  )
  const getSpinButtonText = (): string => {
    return isSpinning ? spinningText : spinButtonText
  }
  const buttonText = getSpinButtonText()

  return (
    <button
      onClick={handleSpin}
      disabled={!canSpin}
      className="spin-button"
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  )
}

export default SpinButton
