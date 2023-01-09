import { useState, useEffect } from "react"

import { ImageModel } from "@models/image"

type ImageProps = ImageModel & {
  currentIndex: number
  selectedIndex: number
}

export const ProgressiveImage = ({ currentIndex, selectedIndex }: ImageProps) => {
  const [mockPhoto, setMockPhoto] = useState<{ id: string, url: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async() => {
      try {
        await fetch(`https://picsum.photos/seed/picsum/info`)
          .then((response) => response.json())
          .then(({ id, download_url: url }) => setMockPhoto({ id, url }))
        setIsLoading(false)
      } catch(error) {
        console.error(error)
        throw new Error(error)
      }
    }
    getData()
  }, [])

  return (
    <div className='m-14 w-96 h-64 rounded bg-stone-600 border-1'>
      {!isLoading ? (
        <img
          alt={''}
          className={`rounded ${selectedIndex < 0 ?  'grayscale-[100%]' : null} ${currentIndex === selectedIndex ? "border-yellow-600 border-4" : null}`}
          src={'https://random.imagecdn.app/500/350'}
          /* src={mockPhoto?.url} */
         />) :
       (
         <p className='place-content-center'>Loading....</p>
       )
      }
      <p>{currentIndex}</p>
    </div>
  )
}

export default ProgressiveImage
