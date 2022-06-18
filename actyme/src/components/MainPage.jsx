import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import useSecuredAxios from '../hooks/useSecureAxios';
import { getUserRouteAPI } from '../utils/APIRoutes';

function SignUp() {
  const securedAxios = useSecuredAxios();
  const navigate = useNavigate();
  const getUsers = async (e) => {
    e.preventDefault();
    const { data } = await securedAxios.get(getUserRouteAPI);
    console.log(data);
  };
  const goLogin = () => {
    navigate("/login");
  };

  return (
    <MainContainer>
      <img src='http://10.16.251.245:8080/?action=stream' alt='camera' />
      <button onClick={ (e) => getUsers(e) }>Get users</button>
      <button onClick={ (e) => goLogin(e) }>Login</button>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  form {
    align-items: center;
    display: flex;
    flex-direction: column;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    span {
      color: white;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
    input.fields {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      margin-bottom: 1rem;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      margin-top: 2rem;
      background-color: #997af0;
      color: white;
      padding: 1rem 6rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      transition: 0.1s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
  }
`;

export default SignUp
