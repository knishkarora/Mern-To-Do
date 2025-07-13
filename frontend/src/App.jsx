import React from 'react'
import AddTodo from './components/AddTodo'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/todo" 
            element={
              <ProtectedRoute>
                <AddTodo />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App