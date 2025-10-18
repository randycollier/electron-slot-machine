interface ReelProps {
  symbol: string
  spinning?: boolean
}

const Reel = ({ symbol, spinning }: ReelProps): JSX.Element => {
  return (
    <div className={`slot-reel ${spinning ? 'spinning' : ''}`}>
      <div className="reel-symbol">{symbol}</div>
    </div>
  )
}

export default Reel
