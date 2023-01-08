import { useState, useEffect, useCallback } from 'react'

import Navbar  from '@components/nav-bar'
import Content from '@components/content'

import { Direction } from '@models/direction'

import './index.css'

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [imageWidth, setImageWidth] = useState<number>(0)
  const [selectedTopic, setSelectedTopic] = useState<{ index: number, id: string }>({ index: 0 })
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  const [topicData, setTopicData] = useState<Array<{ id: string, name: string }>>([])

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  // Calc Content Dimensions
  const rowCount = Math.floor((screenHeight / 256) / 2)
  const colCount = Math.floor(screenWidth / 440)

  // console.log(rowCount, colCount)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
      const topicResponse = await fetch('https://random-word-api.herokuapp.com/word?number=10')
        .then((response) => response.json())
        .then(topics => topics.map((name: string) => ({ name, id: Math.random() })))
        setTopicData(topicResponse)
      } catch(error) {
        console.error(error)
      }
    }
    fetchTopics()
  }, [])


  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event

    event.preventDefault()

    switch (key) {
        case Direction.UP: {
          if (isSidebarOpen) break
          if (selectedIndex < colCount) setIsSidebarOpen(true)
          setSelectedIndex(selectedIndex - colCount)
          break
        }

        case Direction.RIGHT: {
          if (isSidebarOpen) {
            setSelectedTopic({ index: selectedTopic?.index + 1 })
            break
          }
          if (selectedIndex > 0 && (selectedIndex % (colCount - 1) === 0)) {
            console.log('retreive next column')
            break
          }
          setSelectedIndex(selectedIndex + 1)
          break
        }

        case Direction.DOWN: {
          if ((selectedIndex + colCount) >= colCount * rowCount) {
            break
          }
          if (isSidebarOpen) {
            setIsSidebarOpen(false)
          }
          setSelectedIndex(selectedIndex + colCount)
          break;
        }

        case Direction.LEFT: {
          if (selectedIndex % colCount === 0 || selectedIndex === 0) {
            console.log('retreive prev column')
            break
          }
          if (isSidebarOpen) {
            setSelectedTopic({ index: selectedTopic?.index - 1 })
            break
          }
          setSelectedIndex(selectedIndex - 1)
          break
        }
    }
  }, [selectedIndex, isSidebarOpen, selectedTopic.index])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <main className="flex w-screen h-screen overflow-y-hidden">
      <Navbar
        topics={topicData}
        onTopicChange={(index) => setSelectedTopic(index)}
        selectedTopic={selectedTopic}
        isOpen={isSidebarOpen}
      />
      <Content
        colCount={colCount}
        topicId={topicData[selectedTopic.index]}
        amount={rowCount * colCount}
        selectedIndex={selectedIndex}
      />
    </main>
  )
}

export default App
