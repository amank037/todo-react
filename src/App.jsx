import { useState, useEffect } from 'react'
import './App.css'
import { ListItem } from './components/ListItem.jsx'
import backgroundImage from './assets/free-photo-of-a-mountain-range-with-trees-and-a-sky.jpeg'

function App() {
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editedItem, setEditedItem] = useState('')

  useEffect(() => {
    if(list.length > 0) {
      localStorage.setItem('list', JSON.stringify(list))
      console.log('Saving list to localStorage:', list)
    }
  }, [list]) // to add the data to localStorage

  useEffect(() => {
    const savedList = localStorage.getItem('list')
    console.log('Loaded list from localStorage:', savedList)
    if(savedList){
      setList(JSON.parse(savedList))
    }
  }, []) // load the data from localStorage
    
  const handlesDelete = (index) => {
    setList(list.filter((_, i) => i !== index))
  }
  const handlesEdit = (index) => {
    setEditingIndex(index)
    setEditedItem(list[index])
  }
  const handlesSave = (index) => {
    const updatedList = [...list]
    updatedList[index] = editedItem
    setList(updatedList)
    setEditingIndex(null)
  }

  return (
    <div
    className="min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center bg-fixed" 
    style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-8 max-w-3xl rounded-2xl mx-auto my-7 backdrop-blur-sm text-white shadow-2xl min-h-full font-inter">
        <h1 className="text-8xl font-bold mb-8 text-center">TO-DO LIST</h1>
        <div className="mb-4 flex justify-between items-center">
          <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 text-2xl bg-transparent border-b-2 border-white focus:outline-none placeholder-white rounded-none"
          placeholder="Add a new task..."
          />
          <button
          onClick={
            () => {
              if(input.trim()){
                setList([...list, input])
                setInput('')
              }
            }
          }
          className="shadow-md backdrop-blur-sm text-white p-4 px-6 ml-2 text-2xl font-bold rounded-md hover:shadow-inner hover:text-slate-500 transition-all"
          >ADD</button>
        </div>
        <ul className="space-y-4">
          {list.map((item, index) => (
            <ListItem 
            key={index} 
            item={item}
            onDelete={() => handlesDelete(index)}
            onEdit={() => handlesEdit(index)}
            isEditing={editingIndex === index}
            editedItem={editedItem}
            setEditedItem={setEditedItem}
            onSaveEdit={() => handlesSave(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
