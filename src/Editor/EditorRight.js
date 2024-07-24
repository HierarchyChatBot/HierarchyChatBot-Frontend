// Editor/EditorRight.js

import React from 'react';
import { useChapter } from '../JsonContext';

const EditorRight = () => {
  // Destructure the selected chapter and the function to update chapters
  const { selectedChapter, setChapters, chapters } = useChapter();

  // Handle changes in the text area
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;

    // Update the chapters state with the new description
    setChapters(prevChapters =>
      prevChapters.map(chapter =>
        chapter.id === selectedChapter.id ? { ...chapter, description: newDescription } : chapter
      )
    );
  };

  // If there's no selected chapter, show a message
  if (!selectedChapter) {
    return (
      <div style={{ padding: '10px', boxSizing: 'border-box' }}>
        <h1>Editor</h1>
        <p>Select a chapter to edit its description.</p>
      </div>
    );
  }

  // Editor styles
  const editorStyles = {
    padding: '10px',
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const textAreaStyles = {
    width: '100%',
    height: 'calc(100% - 60px)', // Adjusting for heading height
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'none',
  };

  return (
    <div style={editorStyles}>
      <h1>Editor</h1>
      <textarea
        style={textAreaStyles}
        value={selectedChapter.description}
        onChange={handleDescriptionChange}
        placeholder="Edit chapter description here..."
      />
    </div>
  );
};

export default EditorRight;
