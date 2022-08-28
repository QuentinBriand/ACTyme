import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from '../Context/AuthContext';

const SecuredRoute = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        !!currentUser ? <Outlet /> : <Navigate to={{pathname: '/login'}} />
    )
}

export default SecuredRoute