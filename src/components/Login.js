/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoggedInState, userState } from '../states';
import './Login.css';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  const authenticate = () => {
    axios
      .get('http://localhost:3001/db/products', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.name);
        setIsLoggedIn(true);
        console.log(res.data);
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
