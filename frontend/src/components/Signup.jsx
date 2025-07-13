import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/axios'

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { name, email, password } = formData
    if (!name || !email || !password) {
      setError('Please fill all fields')
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/signup', formData)
      if (response.data.success) {
        alert('Registration successful! Please login.')
        navigate('/login')
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black px-4'>
      <div className='w-96 mx-auto'>
        {/* Card with gradient border */}
        <div className='p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl'>
          <div className='bg-gray-900 rounded-xl p-6'>
            {/* Header Section */}
            <div className='text-center mb-6'>
              <h1 
                className='text-3xl font-bold mb-2'
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                TaskFlow
              </h1>
              <p className='text-gray-400 text-sm'>Create your account to get started</p>
            </div>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input 
                  type='text' 
                  placeholder='Full Name' 
                  name='name' 
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200' 
                />
              </div>
              
              <div>
                <input 
                  type='email' 
                  placeholder='Email Address' 
                  name='email' 
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200' 
                />
              </div>
              
              <div>
                <input 
                  type='password' 
                  placeholder='Password' 
                  name='password' 
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200' 
                />
              </div>
              
              {/* Error Message */}
              {error && (
                <div className='bg-red-900/30 border border-red-500 rounded-lg p-3'>
                  <p className='text-red-300 text-xs text-center'>{error}</p>
                </div>
              )}
              
              {/* Submit Button */}
              <button 
                type='submit'
                disabled={loading}
                className='w-full py-3 rounded-lg text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg mt-6'
                style={{
                  background: loading 
                    ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }
                }}
              >
                {loading ? (
                  <span className='flex items-center justify-center'>
                    <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>
            
            {/* Footer Section */}
            <div className='mt-6 pt-4 border-t border-gray-700'>
              <p className='text-gray-400 text-center text-xs mb-3'>
                Already have an account?
              </p>
              <Link to='/login' className='block'>
                <button className='w-full py-2.5 rounded-lg text-white font-medium text-xs bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-300'>
                  Sign In Instead
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup