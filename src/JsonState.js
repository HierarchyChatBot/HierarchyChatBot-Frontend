// JsonState.js

import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';  // Import the UUID function

const JsonState = createContext();

export const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const addMessage = (message) => {
    setChatHistory(prevHistory => [...prevHistory, message]);
  };

  const loadChaptersFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setChapters(data.map(chapter => ({ ...chapter, id: uuidv4() }))); // Assign a unique ID to each loaded chapter
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const saveChaptersToFile = (filename) => {
    const blob = new Blob([JSON.stringify(chapters, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeChapter = (chapterToRemove) => {
    setChapters(prevChapters => prevChapters.filter(chapter => chapter.id !== chapterToRemove.id));
  };

  const reorderChapters = (startIndex, endIndex) => {
    setChapters((prevChapters) => {
      const newChapters = Array.from(prevChapters);
      const [movedChapter] = newChapters.splice(startIndex, 1);
      newChapters.splice(endIndex, 0, movedChapter);
      return newChapters;
    });
  };

  // Function to handle adding a new chapter
  const addChapter = (newChapter) => {
    setChapters(prevChapters => [...prevChapters, { ...newChapter, id: uuidv4() }]); // Assign a unique ID
  };

  return (
    <JsonState.Provider
      value={{
        selectedChapter,
        setSelectedChapter,
        selectedSubItem,
        setSelectedSubItem,
        chapters,
        setChapters,
        chatHistory,
        addMessage,
        loadChaptersFromFile,
        saveChaptersToFile,
        removeChapter,
        reorderChapters,
        addChapter, // Add this to context
      }}
    >
      {children}
    </JsonState.Provider>
  );
};

export const useChapter = () => useContext(JsonState);
