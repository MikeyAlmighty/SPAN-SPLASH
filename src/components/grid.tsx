import { forwardRef, useState, useCallback, useEffect } from 'react'

import ProgressiveImage from "@components/progressive-image"
import { Direction } from '@models/direction'

type GridProps = {
  rowCount: number
  colCount: number
  images: Array<string>
  onFocusLost: () => void
}

const Grid = forwardRef(({
  colCount,
  rowCount,
  onFocusLost,
  images = []
}: GridProps, ref) => {
  const [selectedPosition, setSelectedPositon] = useState<{ row: number, col: number }>({ row: 0, col: 0 })
  const [shouldFetchNext, setShouldFetchNext] = useState<boolean>(false)

  const [imageData, setImageData] = useState<Array<Array<{ id: string, url: string, colIndex: number, rowIndex: number }>>>([])


  const fetchImage = async () => {
    return await fetch( `https://picsum.photos/id/${Math.floor(Math.random() * 99)}/info`)
      .then((response) => response.json())
      .then(({ id, download_url:url }) => ({ colIndex, rowIndex, url, id }))
  }

  useEffect(() => {
   const getImageData = async () => {
      try {
        const gridData = Array.from({ length: rowCount }).map(async(_, rowIndex) => {
          return Promise.all(Array.from({ length: colCount }).map(async(_, colIndex) => {
            await fetchImage()
          }))
        })
        const resolvedData = await Promise.all(gridData)
        setImageData(resolvedData)

      } catch (error) {
        console.error(error)
      }
    }
    getImageData()
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event

    event.preventDefault()

    switch (key) {
      case Direction.UP: {
        if (selectedPosition.row === 0) {
          onFocusLost()
          break
        }
        setSelectedPositon(({ col, row }) => ({ col, row: row - 1 }))
        break
      }

      case Direction.RIGHT: {
        // Higher Horizontal Boundry
        if (selectedPosition.col === colCount - 1) {
          console.log('nextImage')
          setShouldFetchNext(true)
          break
        }
        setSelectedPositon(({ col, row }) => ({ col: col + 1, row }))
        break
      }

      case Direction.DOWN: {
        if (selectedPosition.row === rowCount - 1) {
          break
        }
        setSelectedPositon(({ col, row }) => ({ col, row: row + 1 }))
        break;
      }

      case Direction.LEFT: {
        // Lower Horizontal Boundry
        if (selectedPosition.col === 0) {
          console.log('prevImage')
          break
        }

        setSelectedPositon(({ col, row }) => ({ col: col - 1, row }))
        break
      }
    }
  }, [onFocusLost, selectedPosition?.col, selectedPosition?.row])

  return (
    <div
      ref={ref}
      tabIndex={1}
      onKeyDown={handleKeyDown}
      className={`table w-full h-screen z-0 justify-around bg-stone-500 flex-wrap border-1 border-yellow-600`}
    >
      {imageData.map((column, rowIndex) => (
        <div key={`row-${rowIndex}`} className='table-row'>
          {column.map(({ id, url }, colIndex) => (
            <div key={`row-${rowIndex}-col-${colIndex}`} className='table-cell'>
              <ProgressiveImage
                imageSrc={url}
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
  )
})

export default Grid
