import { useState } from 'react'
import { useAtom } from 'jotai'

import Image from '@components/image'
import { selectionStore } from '@components/store/selection'

import { mockPhotos } from '../mocks/photos'

const Content = ({ selectedIndex }) => {

  // const [selectedIndex, setSelectedIndex] = useAtom(selectionStore)
  // console.log('selectedIndex: ', selectedIndex)
   return(
     <div className='flex flex-wrap justify-start border-1 border-yellow-600'>
       {mockPhotos.map(({ id, urls }, index) => (
         <Image
           key={id}
           selectedIndex={selectedIndex}
           currentIndex={index}
         />
       ))}
     </div>
   )
}

export default Content
