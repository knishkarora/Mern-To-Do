import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/axios'
import Todos from './Todos'

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchTodos()
  }, [navigate])

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos')
      setTodos(response.data.todos || [])
    } catch (err) {
      console.error('Error fetching todos:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await api.post('/todos', { text: newTodo })
      
      if (response.data.success) {
        setNewTodo('')
        fetchTodos() // Refresh todos list
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add todo')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (todoId) => {
    try {
      await api.delete(`/todos/${todoId}`)
      fetchTodos() // Refresh todos list
    } catch (error) {
      setError('Failed to delete todo')
      console.error('Error deleting todo:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div className='min-h-screen bg-black p-8'>
      <div className='w-96 mx-auto'>
        {/* Header */}
        <div className='gradient-border-accent mb-8'>
          <div className='bg-gray-900 p-6 rounded-2xl'>
            <div className='flex justify-between items-center'>
              <div>
                <h1 className='text-gradient text-2xl font-bold mb-2'>TaskFlow</h1>
                <p className='text-gray-400 text-sm'>Welcome back, {user.name || 'User'}!</p>
              </div>
              <button 
                onClick={handleLogout}
                className='px-4 py-2 rounded-lg text-white font-medium glass-effect hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 text-sm'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Add Todo Form */}
        <div className='gradient-border mb-8'>
          <div className='bg-gray-900 p-6 rounded-2xl'>
            <form onSubmit={handleSubmit} className='flex gap-3'>
              <input 
                type="text" 
                placeholder="What needs to be done?" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className='modern-input flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-400 text-base' 
              />
              <button 
                type='submit'
                disabled={loading || !newTodo.trim()}
                className='modern-button px-6 py-3 rounded-lg text-white font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6'>
            <p className='text-red-400 text-sm text-center'>{error}</p>
          </div>
        )}

        {/* Todos List */}
        <Todos todos={todos} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default AddTodo
