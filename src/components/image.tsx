import { ImageModel } from "@models/image"

type ImageProps = ImageModel & {
  currentIndex: number
  selectedIndex: number
}

const Image = ({ id, url, currentIndex, selectedIndex}: ImageProps) => (
    <div className='m-4 w-64 h-64 bg-red-900 border-1 border-yellow-600'>
    <img
        className={`w-64 h-64 ${currentIndex === selectedIndex ? "border-yellow-600 border-4" : null}`}
        src={url}
    />
    <p>{currentIndex}</p>
    </div>
)

export default Image
