// Body.js

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useChapter } from './ChapterContext';

const Body = () => {
  const { setChapters } = useChapter();
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setChapters(data);  // Update context chapters
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
      </nav>
    </div>
  );
};

export default Body;
