import { forwardRef, useState, useCallback, useEffect } from 'react'
import ProgressiveImage from "@components/progressive-image"

import { Direction } from '@models/direction'

type GridProps = {
  rowCount: number
  colCount: number
}

const Grid = forwardRef(({ colCount, rowCount, gridMovement }: GridProps, ref) => {
  const [selectedPosition, setSelectedPositon] = useState<{ row: number, col: number }>({ row: 0, col: 0 })

  console.log('selectedPosition', selectedPosition)
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event

    event.preventDefault()

    switch (key) {
      case Direction.UP: {
        if (selectedPosition.row === 0) {
          gridMovement()
          break
        }
        console.log('up in content')
        setSelectedPositon(({ col, row }) => ({ col, row: row - 1 }))
        break
      }

      case Direction.RIGHT: {
        console.log('right in content')
        if (selectedPosition.col === 0) {
          console.log('nextImage')
        }
        setSelectedPositon(({ col, row }) => ({ col: col + 1, row }))
        break
      }

      case Direction.DOWN: {
        console.log('down in content')
        if (selectedPosition.row === rowCount) {
          gridMovement()
          break
        }
        setSelectedPositon(({ col, row }) => ({ col, row: row + 1 }))
        break;
      }

      case Direction.LEFT: {
        console.log('left in content')
        setSelectedPositon(({ col, row }) => ({ col: col - 1, row }))
        break
      }
    }
    }, [gridMovement, selectedPosition?.col, selectedPosition?.row])

return (
  <div
    ref={ref}
    tabIndex={1}
    onKeyDown={handleKeyDown}
    className={`table w-full h-screen z-0 justify-around bg-stone-500 flex-wrap border-1 border-yellow-600`}
  >
    {Array.from({ length: rowCount }).map((_, rowIndex) => (
      <div className='table-row'>
        {Array.from({ length: colCount }).map((_, colIndex) => (
         <div className='table-cell'>
           <ProgressiveImage
             selectedPosition={selectedPosition}
             currentRowIndex={rowIndex}
             currentColIndex={colIndex}
           />
         </div>
        ))}
      </div>
    ))
    }
  </div>
)})

export default Grid
