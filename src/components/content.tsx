// import { useReducer } from 'react'

import ProgressiveImage from '@components/progressive-image'
import Image from '@components/image'

type ContentProps = {
  selectedIndex: number
  amount: number
  images: Array<{ id: string, url: string }>
  colCount: number
  topicId: string
}

const Content = ({ selectedIndex, images, amount, topicId, colCount }: ContentProps) => {
  // console.log('topicId: ', topicId) // filter to pass to unsplash
   return (
       <div className={`flex z-0 bg-stone-500 justify-around flex-wrap border-1 border-yellow-600`}>
           {images.map(({  id, url }, index) => (
           <Image
             currentIndex={index}
             url={url}
             selectedIndex={selectedIndex}
           />
        ))}
        {/* {Array.from({ length: amount }).map((_, index) => ( */}
        {/*    <ProgressiveImage */}
        {/*      currentIndex={index} */}
        {/*      selectedIndex={selectedIndex} */}
        {/*      key={index} */}
        {/*    /> */}
        {/* ))} */}
     </div>
   )
}

export default Content
