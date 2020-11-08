import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import logoMain from '../assets/icons/logo_main.svg';
import { isLoggedInState, userState } from '../states';
import { plasticPercentState } from '../selector';

const Menu = () => {
  const plasticPercent = useRecoilValue(plasticPercentState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const user = useRecoilValue(userState);

  const loginSpanText = isLoggedIn
    ? `${user}, Current plastic: ${plasticPercent}%`
    : `You need to log in to see your plastic usage`;

  return (
    <>
      <header id="menu-header">
        <Link to="/CAGO-Frontend">
          <img src={logoMain} style={{ width: '50px' }} alt="logo main" />
        </Link>
        <span id="menu-span">{loginSpanText}</span>
      </header>

      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to={isLoggedIn ? '/trash' : '/login'}>Trash</Link>
        </li>
        <li>
          <Link to={isLoggedIn ? '/chart' : '/login'}>Chart</Link>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Menu;
