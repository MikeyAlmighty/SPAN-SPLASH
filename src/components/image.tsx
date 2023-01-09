import { ImageModel } from "@models/image"

type ImageProps = ImageModel & {
  currentIndex: number
  selectedIndex: number
}

export const Image = ({ currentIndex, selectedIndex, url }: ImageProps) => {
  return (
    <div className='m-14 w-96 h-64 rounded bg-stone-600 border-1'>
        <img
          alt={''}
          className={`rounded ${selectedIndex < 0 ?  'grayscale-[100%]' : null} ${currentIndex === selectedIndex ? "border-yellow-600 border-4" : null}`}
          src={url}
          /* src={mockPhoto?.url} */
         />
      <p>{currentIndex}</p>
      <p>{url}</p>
    </div>
  )
}

export default Image
