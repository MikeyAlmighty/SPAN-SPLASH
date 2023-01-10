import { useState, useEffect, forwardRef, useCallback } from 'react'
import { motion } from "framer-motion"

import { Direction } from '@models/direction'
import { TopicModel } from '@models/topics'

type NavBarProps = {
  topics: Array<string>
  isOpen: boolean
  // selectedTopicIndex: number
  onTopicChange: (name: string) => void
}

const NavBar = forwardRef(({
  onTopicChange,
  // selectedTopicIndex,
  topics,
  isOpen,
  navMovement
}: NavBarProps, ref) => {

  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0)

  const handleKeyDown = (event: KeyboardEvent) => {
     const { key } = event

    event.preventDefault()
    switch (key) {
      case Direction.DOWN: {
        console.log('nav down')
        navMovement()
        break
      }
      case Direction.RIGHT: {
        console.log('nav right')
        setSelectedTopicIndex(selectedTopicIndex + 1)
        const currentIndex = selectedTopicIndex + 1
        onTopicChange({ name: topics[currentIndex], index: currentIndex })
        break
      }
      case Direction.LEFT: {
        console.log('nav left')
        setSelectedTopicIndex(selectedTopicIndex - 1)
        const currentIndex = selectedTopicIndex - 1
        onTopicChange({ name: topics[currentIndex], index: currentIndex  })
        break
      }
    }
  }

  return (
    <>
    {isOpen ? <motion.div
      ref={ref}
      onKeyDown={handleKeyDown}
      className="w-screen z-10 border-2 border-yellow-600"
      aria-label="Navbar"
      tabIndex={0}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "easeInOut",
          duration: 0.25
        },
      }}
    >
      <div className="p-4 overflow-y-auto bg-stone-600">
      <ul className="py-6 flex justify-between">
        {topics?.map((name, index) => (
        <li key={name} className='p-4'>
          <a
            href={`#${name}`}
            onClick={() => onTopicChange({ index, name })}
            className={`text-center ${selectedTopicIndex === index ? "bg-yellow-600" : null} p-2 font-bold text-white rounded hover:bg-yellow-600`}
          >
            <span className="ml-3">{name}</span>
            </a>
        </li>
        ))}
      </ul>
      </div>
  </motion.div>
     : null}
  </>
  )}
)

export default NavBar
