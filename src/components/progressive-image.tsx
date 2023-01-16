type ProgressiveImageProps = {
  currentRowIndex: number
  currentColIndex: number
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
  imageSrc
}: ProgressiveImageProps) => {
  const { row: selectedRow, col: selectedCol } = selectedPosition
  const active = (currentRowIndex === selectedRow) && (currentColIndex === selectedCol)

  return (
    <div className='w-84 h-64 m-14'>
      <img
        alt={''}
        className={`w-full h-full ${active ? 'border-yellow-600' : null} border-2 rounded bg-stone-600 border-1`}
        src={imageSrc}
      />
    </div>
  )
}

export default ProgressiveImage
