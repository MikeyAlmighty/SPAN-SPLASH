import { useState, useEffect } from 'react'

import Image from '@components/image'
import { selectionStore } from '@components/store/selection'


const Content = ({ selectedIndex }) => {
  const [mockPhotos, setMockPhotos] = useState<Array<{ id: string, url: string }>>([])

  // Testing
  useEffect(() => {
    const getData = async() => {
      try {
        await fetch('https://picsum.photos/v2/list?page=1&limit=24')
          .then((response) => response.json())
          .then((data) => setMockPhotos(data?.map(({ id, download_url: url }) => ({ id, url }))))
      } catch(error) {
        console.error(error)
        throw new Error(error)
      }
    }
    getData()
  }, [])

   return(
     <div className='flex flex-wrap justify-start border-1 border-yellow-600'>
       {mockPhotos.map(({ id, url }, index) => (
         <Image
           key={id}
           selectedIndex={selectedIndex}
           url={url}
           currentIndex={index}
         />
       ))}
     </div>
   )
}

export default Content
