import { ImageModel } from "@models/image"

type ImageProps = ImageModel & {
  currentIndex: number
  selectedIndex: number
}

const Image = ({ id, urls, currentIndex, selectedIndex }: ImageProps) => {
  const active = false
   return(
     <div className='m-4 w-64 h-64 bg-red-900 border-1 border-yellow-600'>
       <img
         className={`w-64 h-64 ${currentIndex === selectedIndex ? "border-yellow-600 border-4" : null}`}
         src="https://i.insider.com/5f907d90212113001873ff79?width=838&format=jpeg"
       />
       <p>{currentIndex}</p>
     </div>
   )
}

export default Image
