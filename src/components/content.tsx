import ProgressiveImage from '@components/image'

type ContentProps = {
  selectedIndex: number
  amount: number
  colCount: number
  topicId: string
}

const Content = ({ selectedIndex, amount, topicId, colCount }: ContentProps) => {
  // console.log('topicId: ', topicId) // filter to pass to unsplash
   return(
       <div className={`flex z-0 bg-stone-500 justify-around flex-wrap border-1 border-yellow-600`}>
         {Array.from({ length: amount }).map((_, index) => (
            <ProgressiveImage
              currentIndex={index}
              selectedIndex={selectedIndex}
              key={index}
            />
         ))}
     </div>
   )
}

export default Content
