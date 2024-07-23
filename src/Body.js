// Body.js

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useChapter } from './JsonContext';

const Body = () => {
  const { loadChaptersFromFile, saveChaptersToFile } = useChapter();
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      loadChaptersFromFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveClick = () => {
    saveChaptersToFile('chapters.json');
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <button style={{ marginLeft: '10px' }}>Chat Bot</button>
        </Link>
        <Link to="/editor">
          <button style={{ marginLeft: '10px' }}>Open Editor</button>
        </Link>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the default file input
        />
        <button onClick={handleButtonClick} style={{ marginLeft: '10px' }}>Load</button>
        <button onClick={handleSaveClick} style={{ marginLeft: '10px' }}>Save</button>
      </nav>
    </div>
  );
};

export default Body;
