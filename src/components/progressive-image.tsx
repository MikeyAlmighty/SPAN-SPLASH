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
      <img
        alt={'gallery-icon'}
        className={`w-96 m-14 h-64 object-fill ${active ? 'border-yellow-600' : null} border-2 rounded bg-stone-600 border-1`}
        src={imageSrc}
      />
  )
}

export default ProgressiveImage
