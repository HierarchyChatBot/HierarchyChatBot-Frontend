// Body.js
import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <body>
      <nav>
        <Link to="/">
          <button style={{ marginLeft: '10px' }}>Chat Bot</button>
        </Link>
        <Link to="/editor">
          <button style={{ marginLeft: '10px' }}>Open Editor</button>
        </Link>
      </nav>
    </body>
  );
};

export default Body;
