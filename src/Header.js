// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <button style={{ marginLeft: '10px' }}>Chat Bot</button>
        </Link>
        <Link to="/editor">
          <button style={{ marginLeft: '10px' }}>Open Editor</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
