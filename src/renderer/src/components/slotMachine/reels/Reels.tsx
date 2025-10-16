import useReelMovement from '../hooks/useReelMovement'
import Slot from './Reel'

type SlotsProps = {
  reelCount?: number
}
const DEFAULT_REEL_COUNT = 3

const Reels = ({ reelCount = DEFAULT_REEL_COUNT }: SlotsProps): JSX.Element => {
   const { reelSymbols } = useReelMovement({ reelCount })

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {reelSymbols.map((symbol, index) => (
        <Slot key={index} symbol={symbol} />
      ))}
    </div>
  )
}

export default Reels
