import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import logoMain from '../assets/icons/logo_main.svg';
import { plasticPercentState } from '../selector';

const Menu = () => {
  const plasticPercent = useRecoilValue(plasticPercentState);
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
      </ul>
      <hr />
    </>
  );
};

export default Menu;
