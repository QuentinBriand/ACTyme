import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRouteAPI } from '../utils/APIRoutes';
import RememberContainer from '../utils/RememberMe';
import ErrorStyle from '../utils/ErrorStyle';

axios.defaults.withCredentials = true;

function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "not changed",
    rememberme: false
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password, rememberme } = values;
      const { data } = await axios.post(registerRouteAPI, {email, password, rememberme }, { withCredentials: true });
      if (data.status) {
        const token = data.token;
        setAuth({ email, token }); //SET dans la mémoire plutot que cookie ou storage parce que pas safe
        navigate("/");
      } else {
        toast.error(data.msg, ErrorStyle);
      }
    }
  };


  const handleValidation = () => {
    const { email, password, confirmPassword } = values;
    if (email === "") {
        toast.error("Email is required", ErrorStyle);
        return false;
    }
    if (password === "") {
        toast.error("Password is required", ErrorStyle);
        return false;
    }
    if (password.length <= 8) {
        toast.error("Passwords must be at least 8 characters", ErrorStyle);
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Password and the confirmed password do not match", ErrorStyle);
        return false;
    }
    return true;
  };

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:e.target.value});
  };

  const handleCheck = (e) => {
    setValues({...values, [e.target.name]:e.target.checked});
  };

  return (
    <SignupContainer>
      <form onSubmit={(e) => handleSignup(e)}>
        <input  type="email"     placeholder='example@gmail.com'   name="email"            onChange={ (e) => handleChanges(e) } class="fields"/>
        <input  type="password"  placeholder='Password'            name="password"         onChange={ (e) => handleChanges(e) } class="fields"/>
        <input  type="password"  placeholder='Confirm Password'    name="confirmPassword"  onChange={ (e) => handleChanges(e) } class="fields"/>
        <RememberContainer>
          <label class="unselectable">Remember me ?
            <input class="checkbox_input" type="checkbox" name="rememberme" onChange={ (e) => handleCheck(e) }/>
            <svg class="checkbox_check" width="25" height="25">
              <polyline points="4 12 9 17 20 6"/>
            </svg>
          </label>
        </RememberContainer>
        <button type="submit">Sign Up</button>
        <span>Already have an account? <a href="/login">Login</a></span>
      </form>
      < ToastContainer />
    </SignupContainer>
  )
}

const SignupContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
    span {
      color: black;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
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
    button {
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
  }
`;

export default SignUp
