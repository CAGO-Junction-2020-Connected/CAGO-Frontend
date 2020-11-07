import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoMain from '../assets/icons/logo_main.svg';
import { plasticPercentState } from '../selector';


const Menu = () => {
  const plasticPercent = useRecoilValue(plasticPercentState);
  function getUser() {
    console.log("Getting user")
    axios.get('http://localhost:3001/db/products', {
      withCredentials: true})
      .then(res => {
        console.log(res.data)
      })
  }
  return (
    <>
      <header id="menu-header">
        <Link to="/CAGO-Frontend">
          <img src={logoMain} style={{ width: '50px' }} alt="logo main" />
        </Link>
        <span id="menu-span">Current plastic: {plasticPercent}%</span>
      </header>

      <ul>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
        <a href="http://localhost:3001/auth/login">Login</a>
        <button type="button" onClick={getUser}>Get User</button>
      </ul>
      <hr />
    </>
  );
};

export default Menu;
