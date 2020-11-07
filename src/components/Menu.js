import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
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
