import { useState, useEffect, useCallback } from 'react'

import Navbar from '@components/nav-bar'
import Content from '@components/content'

import { Direction } from '@models/direction'

import './index.css'

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectedTopic, setSelectedTopic] = useState<{ index: number, id: string }>({ index: 0 })
  const [isNavOpen, setIsNavOpen] = useState<boolean>(true)

  const [topicData, setTopicData] = useState<Array<{ id: string, name: string }>>([])

  const [imageData, setImageData] = useState<Array<{ id: string, url: string }>>([])

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
      } catch (error) {
        console.error(error)
      }
    }
    fetchTopics()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        await fetch(`https://picsum.photos/v2/list?page=1&limit=${colCount * rowCount}`)
          .then((response) => response.json())

          .then((data) => (data?.map(({ id, download_url: url }, index) => ({ index, url }))))
          .then((data) => setImageData(data))
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  const getNextImages = async () => {
    await fetch(`https://picsum.photos/v2/list?page=3&limit=${rowCount}`)
      .then((response) => response.json())
      .then((data) => (data?.map(({ id, download_url: url }, index) => ({ index: index +  imageData.length, url }))))
      .then((newData) => {
        // const firstColumn = imageData.filter((_, index) => (index % colCount === 0)) // column which will get removed, potentially add to list for previous navigation
        const filtered = imageData.filter((_, index) => (index % colCount !== 0))
        setImageData([...filtered, ...newData])
      })
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event

    event.preventDefault()

    switch (key) {
      case Direction.UP: {
        if (isNavOpen) break
        if (selectedIndex < colCount) setIsNavOpen(true)
        setSelectedIndex(selectedIndex - colCount)
        break
      }

      case Direction.RIGHT: {
        if (isNavOpen) {
          setSelectedTopic({ index: selectedTopic?.index + 1 })
          break
        }
        if (selectedIndex > 0 && (selectedIndex % (colCount - 1) === 0)) {
          console.log('retreive next column')
          getNextImages()
          setSelectedIndex(0)
          break
        }
        setSelectedIndex(selectedIndex + 1)
        break
      }

      case Direction.DOWN: {
        if ((selectedIndex + colCount) >= colCount * rowCount) {
          break
        }
        if (isNavOpen) setIsNavOpen(false)
        setSelectedIndex(selectedIndex + colCount)
        break;
      }

      case Direction.LEFT: {
        if (selectedIndex % colCount === 0 || selectedIndex === 0) {
          console.log('retreive prev column')
          getNextImages() // getPrevImages
          break
        }
        if (isNavOpen) {
          setSelectedTopic({ index: selectedTopic?.index - 1 })
          break
        }
        setSelectedIndex(selectedIndex - 1)
        break
      }
    }
  }, [selectedIndex, isNavOpen, selectedTopic.index])

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
        onTopicChange={(index: number) => setSelectedTopic(index)}
        selectedTopic={selectedTopic}
        isOpen={isNavOpen}
      />
      <Content
        images={imageData}
        colCount={colCount}
        topicId={topicData[selectedTopic.index]}
        amount={rowCount * colCount}
        selectedIndex={selectedIndex}
      />
    </main>
  )
}

export default App
