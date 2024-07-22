// ChapterContext.js

import React, { createContext, useState, useContext } from 'react';

const ChapterContext = createContext();

export const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [chapters, setChapters] = useState([]);  // Added chapters state
  const [chatHistory, setChatHistory] = useState([]);

  const addMessage = (message) => {
    setChatHistory(prevHistory => [...prevHistory, message]);
  };

  return (
    <ChapterContext.Provider
      value={{
        selectedChapter,
        setSelectedChapter,
        selectedSubItem,
        setSelectedSubItem,
        chapters,           // Provide chapters state
        setChapters,        // Provide setter for chapters
        chatHistory,
        addMessage,
      }}
    >
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapter = () => useContext(ChapterContext);
