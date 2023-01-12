import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type ProgressiveImageProps = {
  currentRowIndex: number
  currentColIndex: number
  shouldFetchNext: boolean
  imageSrc: string
  selectedPosition: {
    row: number
    col: number
  }
}

export const ProgressiveImage = ({
  currentRowIndex,
  currentColIndex,
  selectedPosition,
  imageSrc,
  shouldFetchNext
}: ProgressiveImageProps) => {
  const { row: selectedRow, col: selectedCol } = selectedPosition
  const active = (currentRowIndex === selectedRow) && (currentColIndex === selectedCol)

  return (
    <div className='w-84 h-64'>
      <motion.img
        initial={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        animate={{
          scale: 1.2
        }}
        alt={''}
        className={`m-14 w-84 h-64 ${active ? 'border-yellow-600' : null } border-2 rounded bg-stone-600 border-1`}
        src={imageSrc}
      />
    </div>
  )
}

export default ProgressiveImage
