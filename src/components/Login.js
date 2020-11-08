/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { plasticState, isLoggedInState, userState } from '../states';

const Login = ({ history }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setPlastic = useSetRecoilState(plasticState);
  const setUser = useSetRecoilState(userState);

  const authenticate = () => {
    axios
      .get('http://localhost:3001/db/current-user', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data.name);
          setIsLoggedIn(true);
          setPlastic(res.data.plasticCount);
          history.push('/CAGO-Frontend');
        }
      });
  };

  if (isLoggedIn) {
    return <span>You are now logged in :)</span>;
  }

  return (
    <>
      <a
        href="http://localhost:3001/auth/login"
        // target="_blank"
        // rel="noreferrer"
      >
        <button type="button">Login</button>
      </a>
      <button type="button" onClick={authenticate}>
        Authenticate
      </button>
    </>
  );
};
export default Login;
