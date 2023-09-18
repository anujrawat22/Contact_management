import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/contacts")
  })
  return (
    <h1>Welcome to Contact Management app</h1>
  )
}

export default Home