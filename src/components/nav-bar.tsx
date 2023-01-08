import { motion } from "framer-motion"

import { TopicModel } from '@models/topics'

type NavBarProps = {
  isOpen: boolean
  topics: Array<TopicModel>
  selectedTopic: { index: number }
  onTopicChange: (index: number) => void
}

const NavBar = ({
  isOpen = false,
  onTopicChange,
  selectedTopic,
  topics
}: NavBarProps) => (
  <>
    {isOpen && (
      <motion.aside
        className="w-screen z-10 border-2 border-yellow-600" aria-label="Navbar"
        animate={{
          position: 'absolute',
          transition: { duration: 1 },
        }}
      >
        <div className="p-4 bg-stone-500 overflow-y-auto bg-stone-600 dark:bg-gray-800">
        <ul className="py-6 flex justify-between">
          {topics?.map(({ id, name }, index) => (
          <li className='p-4'>
            <a
              key={id}
              href={`#${name}`}
              onClick={() => onTopicChange(index)}
              className={`text-center ${selectedTopic.index === index ? "bg-yellow-600" : null} p-2 font-bold text-white rounded dark:text-white hover:bg-yellow-600 dark:hover:bg-gray-700`}
            >
              <span className="ml-3">{name}</span>
              </a>
          </li>
          ))}
        </ul>
        </div>
    </motion.aside>
  )}
  </>
)

export default NavBar
