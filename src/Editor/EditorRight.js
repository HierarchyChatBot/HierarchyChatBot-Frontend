// Editor/EditorRight.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonState';

const EditorRight = () => {
  const {
    selectedChapter,
    selectedSubItem,
    setChapters,
    editSubItemDescription,
  } = useChapter();

  // Local state for the chapter and subitem descriptions
  const [localChapterDescription, setLocalChapterDescription] = useState('');
  const [localSubItemDescription, setLocalSubItemDescription] = useState('');

  // Debounce function to delay updates
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Update local states whenever a new chapter or subitem is selected
  useEffect(() => {
    if (selectedChapter) {
      setLocalChapterDescription(selectedChapter.description || '');
    } else {
      setLocalChapterDescription(''); // Reset if no chapter is selected
    }

    if (selectedSubItem) {
      setLocalSubItemDescription(selectedSubItem.description || '');
    } else {
      setLocalSubItemDescription(''); // Reset if no subitem is selected
    }
  }, [selectedChapter, selectedSubItem]);

  // Function to update the chapter description
  const updateChapterDescription = (newDescription) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === selectedChapter.id ? { ...chapter, description: newDescription } : chapter
      )
    );
  };

  // Debounced function for updating chapter description
  const debouncedUpdateChapterDescription = debounce(updateChapterDescription, 300);

  // Handle changes in the chapter description text area
  const handleChapterDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setLocalChapterDescription(newDescription);

    // Update the chapter description only if a chapter is selected
    if (selectedChapter) {
      debouncedUpdateChapterDescription(newDescription);
    }
  };

  // Function to update the subitem description
  const updateSubItemDescription = (newDescription) => {
    if (selectedChapter && selectedSubItem) {
      editSubItemDescription(selectedChapter, selectedSubItem, newDescription);
    }
  };

  // Debounced function for updating subitem description
  const debouncedUpdateSubItemDescription = debounce(updateSubItemDescription, 300);

  // Handle changes in the subitem description text area
  const handleSubItemDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setLocalSubItemDescription(newDescription);

    // Update the subitem description only if a subitem is selected
    if (selectedSubItem) {
      debouncedUpdateSubItemDescription(newDescription);
    }
  };

  // Editor styles
  const editorStyles = {
    padding: '10px',
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Add some gap between the sections
  };

  const sectionStyles = {
    padding: '10px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    resize: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  };

  const chapterStyles = {
    ...sectionStyles,
    height: '30%',
  };

  const subItemStyles = {
    ...sectionStyles,
    height: '60%',
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div style={editorStyles}>
      <div style={chapterStyles}>
        <h1 style={titleStyle}>
          Chapter {selectedChapter ? `(${selectedChapter.chapter})` : ''} Description:
        </h1>
        <textarea
          style={{ width: '100%', height: 'calc(100% - 2em)', padding: '10px', fontSize: '16px' }}
          value={localChapterDescription}
          onChange={handleChapterDescriptionChange}
          placeholder="Edit chapter description here..."
        />
      </div>
      <div style={subItemStyles}>
        <h1 style={titleStyle}>
          Subitem {selectedSubItem ? `(${selectedSubItem.item})` : ''} Description:
        </h1>
        <textarea
          style={{ width: '100%', height: 'calc(100% - 2em)', padding: '10px', fontSize: '16px' }}
          value={localSubItemDescription}
          onChange={handleSubItemDescriptionChange}
          placeholder="Edit subitem description here..."
        />
      </div>
    </div>
  );
};

export default EditorRight;
