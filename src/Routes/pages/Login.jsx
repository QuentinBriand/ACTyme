import { auth } from '../../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from "react-router-dom"
import React, { useContext, useCallback } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Login = () => {
    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
        } catch (error) {
            alert(error)
        }
    }, [ ]);

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder='Email'/>
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder=''/>
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login