import React from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SecuredRoute from './SecuredRoute';

const CustomRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<SecuredRoute/>}>
                <Route exact path="/" element={<Home/>} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  )
}

export default CustomRouter