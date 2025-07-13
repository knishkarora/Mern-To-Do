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
        <div className='min-h-screen flex items-center justify-center bg-black p-4'>
            <div className='gradient-border-secondary w-full max-w-md'>
                <div className='bg-gray-900 p-8 rounded-2xl'>
                    <div className='text-center mb-8'>
                        <h1 className='text-gradient text-4xl font-bold mb-2'>TaskFlow</h1>
                        <p className='text-gray-400 text-sm'>Create your account to get started</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <input 
                                type='text' 
                                placeholder='Full name' 
                                name='name' 
                                value={formData.name}
                                onChange={handleChange}
                                className='modern-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 text-base' 
                            />
                        </div>
                        
                        <div>
                            <input 
                                type='email' 
                                placeholder='Email address' 
                                name='email' 
                                value={formData.email}
                                onChange={handleChange}
                                className='modern-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 text-base' 
                            />
                        </div>
                        
                        <div>
                            <input 
                                type='password' 
                                placeholder='Create password' 
                                name='password' 
                                value={formData.password}
                                onChange={handleChange}
                                className='modern-input w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 text-base' 
                            />
                        </div>
                        
                        {error && (
                            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3'>
                                <p className='text-red-400 text-sm text-center'>{error}</p>
                            </div>
                        )}
                        
                        <button 
                            type='submit'
                            disabled={loading}
                            className='modern-button w-full py-3 rounded-lg text-white font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div className='mt-8 pt-6 border-t border-gray-800'>
                        <p className='text-gray-400 text-center text-sm mb-4'>Already have an account?</p>
                        <Link to='/login'>
                            <button className='w-full py-3 rounded-lg text-white font-medium text-base glass-effect hover:bg-white/10 transition-all duration-300'>
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
