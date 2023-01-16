import { useState, forwardRef } from 'react'

import { Direction } from '@models/direction'

type NavBarProps = {
  topics: Array<string>
  onFocusLost: () => void
  onTopicChange: ({ index, title }: { index: number, title: string }) => void
}

const MAX_TOPIC_COUNT = 10
const MIN_TOPIC_COUNT = 0

const NavBar = forwardRef(({
  onTopicChange,
  topics,
  onFocusLost
}: NavBarProps, ref) => {

  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0)

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event

    event.preventDefault()
    switch (key) {
      case Direction.DOWN: {
        onFocusLost()
        break
      }
      case Direction.RIGHT: {
        const currentIndex = selectedTopicIndex + 1
        // Upper Boundry
        if (currentIndex === MAX_TOPIC_COUNT) break;
        setSelectedTopicIndex(currentIndex)
        onTopicChange({ ...topics[currentIndex], index: currentIndex })
        break
      }
      case Direction.LEFT: {
        const currentIndex = selectedTopicIndex - 1
        // Lower Boundry
        if (currentIndex < MIN_TOPIC_COUNT) break;
        setSelectedTopicIndex(currentIndex)
        onTopicChange({ ...topics[currentIndex], index: currentIndex })
        break
      }
    }
  }

  return (
    <div
      ref={ref}
      onKeyDown={handleKeyDown}
      className="w-screen z-10 border-2 border-yellow-600"
      aria-label="Navbar"
      tabIndex={0}
    >
      <div className="p-4 overflow-y-auto bg-stone-600">
        <ul className="py-6 flex justify-between">
          {topics?.map((title, index) => (
            <li key={index} className='p-4'>
              <a
                href={`#${title}`}
                onClick={() => onTopicChange({ index, title })}
                className={`text-center ${selectedTopicIndex === index ? "bg-yellow-600" : null} p-2 font-bold text-white rounded hover:bg-yellow-600`}
              >
                <span className="ml-3">{title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
)

export default NavBar
