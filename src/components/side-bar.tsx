import { mockTopics } from "../mocks/topics"

const SideBar = () => {
return(
  <aside className="w-64 h-full border-2 border-yellow-600" aria-label="Sidebar">
   <div className="p-4 h-full bg-stone-500 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="py-6 flex flex-col justify-between h-full">
        {mockTopics?.map(({ id, name }) => (
           <li className='p-4'>
             <a key={id} href={`#${name}`} className="text-center p-2 font-bold text-white rounded dark:text-white hover:bg-yellow-600 dark:hover:bg-gray-700">
               <span className="ml-3">{name}</span>
            </a>
         </li>
        ))}
      </ul>
   </div>
</aside>
)
}

export default SideBar
