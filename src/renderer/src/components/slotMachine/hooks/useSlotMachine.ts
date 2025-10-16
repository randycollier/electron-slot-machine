import { useState } from 'react'

const useSlotMachine = (): { slots: string[] } => {
  const [slots] = useState<string[]>([])
  return {
    slots
  }
}

export default useSlotMachine
