import { useIntl } from 'react-intl'

interface PlayerInfoProps {
  name: string
  balance: number
}

const PlayerInfo = ({ name, balance }: PlayerInfoProps): JSX.Element => {
  const { formatMessage } = useIntl()
  const playerName = formatMessage(
    {
      id: 'playerInfo.player',
      defaultMessage: 'Player: {name}'
    },
    { name }
  )
  const balanceText = formatMessage(
    {
      id: 'playerInfo.balance',
      defaultMessage: 'Balance: {balance} Credits'
    },
    { balance }
  )
  return (
    <div className="player-info">
      <h2>{playerName}</h2>
      <h3>{balanceText}</h3>
    </div>
  )
}

export default PlayerInfo
