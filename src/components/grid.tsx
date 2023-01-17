import { forwardRef, useState, useCallback, useEffect, KeyboardEvent } from 'react'

import ProgressiveImage from '@components/progressive-image'
import { Direction } from '@models/direction'
import { TopicModel } from '@models/topics'

type GridProps = {
  rowCount: number
  colCount: number
  selectedTopic: TopicModel
  onFocusLost: () => void
}

const Grid = forwardRef<HTMLDivElement,GridProps>(({
  colCount,
  rowCount,
  onFocusLost,
  selectedTopic
}, ref) => {
  const [selectedPosition, setSelectedPositon] = useState<{ row: number, col: number }>({ row: 0, col: 0 })

  const [imageData, setImageData] = useState<Array<Array<{ id: string, url: string, colIndex: number, rowIndex: number }>>>([])

  const fetchImages = useCallback(async (rowIndex: number, signal?: AbortSignal) => {
    const response = await fetch(`https://api.unsplash.com/photos/random?topics=${selectedTopic.id}`, {
      signal,
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      }
    })

    const data = selectedTopic?.id && await response.json()
    const { id, urls: { small } } = data
    return { colIndex: colCount, rowIndex, url: small, id }
  }, [colCount, selectedTopic?.id])

  useEffect(() => {
    const abortController = new AbortController()
    const getImageData = async () => {
      try {
        const gridData = await Promise.all(Array.from({ length: rowCount }).map(async (_, rowIndex) => (
          await Promise.all(Array.from({ length: colCount }).map(async () => (
            await fetchImages(rowIndex, abortController.signal))))
        )))

        const resolvedData = await Promise.all(gridData)
        setImageData(resolvedData)
        return () => { abortController.abort() }
      } catch (error) {
        console.error(error)
      }
    }
    getImageData()
  }, [colCount, fetchImages, rowCount])

  const fetchBackward = async () => {
    const newImages = await Promise.all(
      Array.from({ length: rowCount }).map(async (_, rowIndex) => (
        await fetchImages(rowIndex)
      )))

    const newData = imageData.map((rows) => {

      // @ts-ignore
      return rows.reduce((accum, currentCol, colIndex) => {
        if (colIndex + 1 === colCount) return accum
        return [...accum, { ...currentCol, colIndex: colIndex - 1 }]
      }, [])
    })

    // Add newImages to last column
    // @ts-ignore
    setImageData(newData.map((col, index: number) => ([newImages[index], ...col])))
    setSelectedPositon({ col: colCount - 1, row: 0 })
  }

  const fetchForward = async () => {
    const newImages = await Promise.all(
      Array.from({ length: rowCount }).map(async (_, rowIndex) => (
        await fetchImages(rowIndex)
      )))

    const newData = imageData.map((rows, rowIndex) => {
      // @ts-ignore
      return rows.reduce((accum, currentCol, colIndex) => {
        // "Remove" images from first column
        if (colIndex === 0) return accum
        if (colIndex === colCount) return [...accum, newImages[rowIndex]]
        return [...accum, currentCol]
      }, [])
    })
    // Add newImages to first column
    // @ts-ignore
    setImageData(newData.map((col, index) => ([...col, newImages[index]])))
    setSelectedPositon({ col: 0, row: 0 })
  }

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
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
          fetchForward()
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
          fetchBackward()
          break
        }
        setSelectedPositon(({ col, row }) => ({ col: col - 1, row }))
        break
      }
    }
  }, [onFocusLost, selectedPosition?.col, selectedPosition?.row, fetchBackward, fetchForward, rowCount, colCount])

  return (
    <div
      ref={ref}
      tabIndex={1}
      onKeyDown={handleKeyDown}
      className={'table w-full h-screen z-0 justify-around bg-stone-500 flex-wrap border-1 border-yellow-600'}
    >
      {imageData.map((column, rowIndex) => (
        <div key={`row-${rowIndex}`} className='table-row'>
          {column.map(({ url }, colIndex) => (
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
