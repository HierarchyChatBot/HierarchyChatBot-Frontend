// Editor/EditorRight.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonContext';

const EditorRight = () => {
  const { selectedChapter, setChapters } = useChapter();
  
  // Local state for the description
  const [localDescription, setLocalDescription] = useState('');

  // Debounce function to delay updates
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Update the local description state whenever a new chapter is selected
  useEffect(() => {
    if (selectedChapter) {
      setLocalDescription(selectedChapter.description || '');
    }
  }, [selectedChapter]);

  // Function to update the chapters state with the new description
  const updateChapterDescription = (newDescription) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === selectedChapter.id ? { ...chapter, description: newDescription } : chapter
      )
    );
  };

  // Debounced function for updating the chapter description
  const debouncedUpdateChapterDescription = debounce(updateChapterDescription, 300);

  // Handle changes in the text area
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setLocalDescription(newDescription);
    debouncedUpdateChapterDescription(newDescription);
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
        value={localDescription}
        onChange={handleDescriptionChange}
        placeholder="Edit chapter description here..."
      />
    </div>
  );
};

export default EditorRight;
