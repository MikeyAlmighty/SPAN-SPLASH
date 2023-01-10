type ProgressiveImageProps = {
  currentRowIndex: number
  currentColIndex: number
  selectedPosition: {
    row: number
    col: number
  }
}

export const ProgressiveImage = ({ currentRowIndex, currentColIndex, selectedPosition }: ProgressiveImageProps) => {
  const { row: selectedRow, col: selectedCol } = selectedPosition
  const active = currentRowIndex === selectedRow && currentColIndex === selectedCol
  return (
    <div className={`m-14 w h-64 ${active ? 'border-2 border-yellow-600' : null } rounded bg-stone-600 border-1`}>
      <img
        alt={''}
        placeholder='loading'
        src={'https://picsum.photos/440/278'}
      />
    </div>
  )
}

export default ProgressiveImage
