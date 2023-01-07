import { useState, useRef, useCallback, useEffect } from 'react'

import SideBar from '@components/side-bar'
import Content from '@components/content'
import { selectionStore } from '@components/store/selection'

import './index.css'


enum Direction {
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
}

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const handleKeyPress = (event) => {
    const { key } = event

    event.preventDefault()

    switch (key) {
        // case Direction.UP: {
        //   setSelectedIndex(0)
        // }
        case Direction.RIGHT: {
          setSelectedIndex(selectedIndex + 1)
          break
        }
        // case Direction.DOWN: {
        //   setSelectedIndex((selectedIndex ) => selectedIndex + 5)
        // }

        case Direction.LEFT: {
          setSelectedIndex(selectedIndex - 1)
          break
        }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
      <main className="flex bg-stone-500 w-screen h-screen">
        {/* <SideBar /> */}
        <Content selectedIndex={selectedIndex} />
      </main>
  )
}

export default App
