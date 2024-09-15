import React from 'react'

export const ListItem = ({item, onDelete, onEdit, isEditing, editedItem, setEditedItem, onSaveEdit}) => {
  return (
    <li className="flex justify-between items-center gap-5 p-2 transition-all border-b border-neutral-400">
      {isEditing ? (
        <input 
        type="text"
        value={editedItem}
        onChange={(e) => setEditedItem(e.target.value)}
        className="w-full p-2 text-lg bg-transparent focus:outline-none"
        />
      ) : (
        <span className="text-white text-lg font-light break-words w-max-100 overflow-hidden"
        >{item}</span>
      )}

      <div className="flex space-x-2">
        {isEditing ? (
          <button 
          onClick={onSaveEdit}
          className="text-white hover:text-green-500 transition-all"
          >SAVE</button>
        ) : (
          <button 
          onClick={onEdit}
          className="text-white hover:text-blue-500 transition-all"
          >EDIT</button>
        )}

        <button 
        onClick={onDelete}
        className="text-white hover:text-red-500 transition-all"
        >DELETE</button>
      </div>
    </li>
  )
}


