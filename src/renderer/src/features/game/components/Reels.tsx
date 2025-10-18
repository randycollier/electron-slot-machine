import Reel from './Reel'
import '@/assets/slot-reel.css'

interface ReelState {
  symbol: string
  isSpinning: boolean
}

interface ReelsProps {
  reels: ReelState[]
}

const Reels = ({ reels }: ReelsProps): JSX.Element => {
  return (
    <div className="reels-container">
      {reels.map((reelState, index) => (
        <Reel spinning={reelState.isSpinning} key={index} symbol={reelState.symbol} />
      ))}
    </div>
  )
}

export default Reels
