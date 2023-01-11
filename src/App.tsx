import { useState, useEffect, useRef } from 'react'

import Navbar from '@components/nav-bar'
import Grid from '@components/grid'

import './index.css'

const App = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const navbarRef = useRef(null)
  const gridRef = useRef(null)

  // Calc Content Dimensions
  const rowCount = Math.floor((screenHeight / 256) / 2)
  const colCount = Math.floor(screenWidth / 440)

  const [topicData, setTopicData] = useState<Array<string>>([])
  const [selectedTopic, setSelectedTopic] = useState<{ index: number, name: string }>({ index: 0 })

  const [imageData, setImageData] = useState<Array<string>>([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        await fetch('https://random-word-api.herokuapp.com/word?number=10')
          .then((response) => response.json())
          .then(topics => setTopicData(topics))
      } catch (error) {
        console.error(error)
      }
    }
    fetchTopics()
    navbarRef.current?.focus()
  }, [])

  return (
    <main className="flex flex-col w-screen h-screen overflow-y-hidden">
      <Navbar
        ref={navbarRef}
        topics={topicData}
        onFocusLost={() => gridRef.current?.focus()}
        onTopicChange={(topic) => setSelectedTopic(topic)}
      />
      <Grid
        ref={gridRef}
        onFocusLost={() => navbarRef.current?.focus()}
        images={imageData}
        rowCount={rowCount}
        colCount={colCount}
      />
    </main>
  )
}

export default App
