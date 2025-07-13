import React from 'react'

const Todos = ({ todos, onDelete }) => {
  return (
    <div className='space-y-4'>
      {todos.length === 0 ? (
        <div className='gradient-border'>
          <div className='bg-gray-900 p-8 rounded-2xl text-center'>
            <div className='text-gray-400 mb-4'>
              <svg className='w-16 h-16 mx-auto mb-4 opacity-50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-300 mb-2'>No tasks yet</h3>
            <p className='text-gray-400 text-sm'>Add your first task above to get started</p>
          </div>
        </div>
      ) : (
        todos.map(todo => (
          <div key={todo._id || todo.id} className='gradient-border'>
            <div className='bg-gray-900 p-4 rounded-2xl flex items-center justify-between group hover:bg-gray-800/50 transition-all duration-300'>
              <span className='text-gray-100 text-base flex-1 pr-4'>{todo.text}</span>
              <button 
                onClick={() => onDelete(todo._id || todo.id)}
                className='px-4 py-2 rounded-lg text-white font-medium glass-effect hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 text-sm'
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Todos
