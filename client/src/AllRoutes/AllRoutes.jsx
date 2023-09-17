import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Contacts from '../pages/Contacts'



const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/contacts' element={<Contacts />} />
        </Routes>
    )
}

export default AllRoutes