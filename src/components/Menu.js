import React from 'react';
import { Link } from 'react-router-dom';
import logoMain from '../assets/icons/logo_main.svg';

const Menu = () => {
  return (
    <>
      <Link to="/CAGO-Frontend">
        <img src={logoMain} style={{ width: '50px' }} alt="logo main" />
      </Link>
      <ul>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
        <li>
          <Link to="/chart">Chart</Link>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Menu;
