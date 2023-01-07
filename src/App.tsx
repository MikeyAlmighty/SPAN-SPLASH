import { useState, useEffect, useRef } from 'react'

import Navbar from '@components/nav-bar'
import Grid from '@components/grid'

import { TopicModel } from '@models/topics'

import './index.css'

const App = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  const navbarRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Calc Content Dimensions
  const rowCount = Math.floor((screenHeight / 256) / 2)
  const colCount = Math.floor(screenWidth / 440)

  const [topicData, setTopicData] = useState<TopicModel[]>([])
  const [selectedTopic, setSelectedTopic] = useState<TopicModel>({ id: "", index: 0, title: "" })

  useEffect(() => {
    const abortController = new AbortController()
    const fetchTopics = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/topics?per_page=10', {
          signal: abortController.signal,
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
          },
        })
        const data = await response.json()

        const initial = {
          title: data[0].title,
          id: data[0].id
        }
        setTopicData(data)
        setSelectedTopic({ index: 0, ...initial })
      } catch (error) {
        console.error(error)
      }
    }
    fetchTopics()
    navbarRef.current?.focus()

    return () => abortController.abort()
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
        selectedTopic={selectedTopic}
        onFocusLost={() => navbarRef.current?.focus()}
        rowCount={rowCount}
        colCount={colCount}
      />
    </main>
  )
}

export default App
