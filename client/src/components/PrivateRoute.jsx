import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const {user} = useAuth()
    const {isAuthenticated} = user
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute