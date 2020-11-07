import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
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
