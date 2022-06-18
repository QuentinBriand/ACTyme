import axios from 'axios';
import styled from 'styled-components';
import ErrorStyle from '../utils/ErrorStyle';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import { loginRouteAPI } from '../utils/APIRoutes';
import React, { useState, useContext } from 'react';
import RememberContainer from '../utils/RememberMe';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberme: false
  });

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:e.target.value});
  };

  const handleCheck = (e) => {
    setValues({...values, [e.target.name]:e.target.checked});
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const email = values.email;
    let token = undefined;
    try {
      const { data } = await axios.post(loginRouteAPI, values, { withCredentials: true });
      token = data.token;
      console.log("New email: ", email);
      setAuth({ email, token });
      navigate(from, { replace: true });
    } catch(err) {
      if (err.response === undefined) {
        throw err;
      }
      if (err.response.status === 401 || err.response.status === 404) {
        toast.error(err.response.data.msg, ErrorStyle);
      }
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={(e) => handleSignup(e)}>
        <input  type="email"     placeholder='example@gmail.com' name="email"    onChange={ (e) => handleChanges(e) } className="fields"/>
        <input  type="password"  placeholder='Password'          name="password" onChange={ (e) => handleChanges(e) } className="fields"/>
        <RememberContainer>
          <label className="unselectable">Remember me ?
            <input className="checkbox_input" type="checkbox" name="rememberme" onChange={ (e) => handleCheck(e) }/>
            <svg className="checkbox_check" width="25" height="25">
              <polyline points="4 12 9 17 20 6"/>
            </svg>
          </label>
        </RememberContainer>
        <button type="submit">Log In</button>
      </form>
      <ToastContainer />
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  button[type="submit"] {
    margin-top: 2rem;
    background-color: #2C70D4;
    color: white;
    padding: .5rem 6rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 1rem;
    font-size: 2rem;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #3CAFEA;
    }
  }
  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2rem;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1rem);
    padding: 3rem 5rem;
  }
  input.fields {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid rgba(255, 255, 255, 0.3);
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
    transition: all 0.6s;
    &:focus {
      border: 0.1rem solid rgba(255, 255, 255, 0.7);
      outline: none;
    }
  }
`;

export default Login;
