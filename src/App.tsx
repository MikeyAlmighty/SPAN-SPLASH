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
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

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

  // const getNextImages = async () => {
  //  await fetch(`https://picsum.photos/v2/list?page=2&limit=${rowCount}`)
  //   .then((response) => response.json())
  //   .then((data) => (data?.map(({ id, download_url: url }, index) => ({ index: index + imageData.length + 1, url }))))
  //   .then((newData) => {
  //     // const firstColumn = imageData.filter((_, index) => (index % colCount === 0)) // column which will get removed, potentially add to list for previous navigation
  //     const filtered = imageData.filter((_, index) => (index % colCount !== 0))
  //     const toUpdate = [...filtered, ...newData]
  //     setImageData(toUpdate)
  //   })
  // }

  return (
    <main className="flex flex-col w-screen h-screen overflow-y-hidden">
      <Navbar
        isOpen={isNavOpen}
        ref={navbarRef}
        topics={topicData}
        navMovement={() => gridRef.current?.focus()}
        onTopicChange={(topic) => setSelectedTopic(topic)}
      />
      <Grid
        ref={gridRef}
        rowCount={rowCount}
        gridMovement={() => navbarRef.current?.focus()}
        colCount={colCount}
      />
    </main>
  )
}

export default App
