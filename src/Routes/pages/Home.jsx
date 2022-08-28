import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from "react-router-dom"
import { auth, db } from '../../config/firebaseConfig'
import { set, ref } from "firebase/database"


const Home = () => {
  let navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const signOut = () => {
    auth.signOut();
    navigate('/login');
  }
  const testSave = () => {
    console.log('testSave');
    set(ref(db, '/test'), {
      test: 'test'
    })
  }
  return (
    <div>
        <h1>Home</h1>
        {currentUser ? <p>Welcome, {currentUser.email}</p> : <p>Please log in</p>}
        <button onClick={testSave}>Test save</button>
        <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default Home