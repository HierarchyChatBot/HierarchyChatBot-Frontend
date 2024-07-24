// JsonState.js

import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const JsonState = createContext();

export const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [expandedChapter, setExpandedChapter] = useState(null); // Added expandedChapter state

  const addMessage = (message) => {
    setChatHistory(prevHistory => [...prevHistory, message]);
  };

  const loadChaptersFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setChapters(data.map(chapter => ({ ...chapter, id: uuidv4() })));
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

  const addChapter = (newChapter) => {
    setChapters(prevChapters => [...prevChapters, { ...newChapter, id: uuidv4() }]);
  };

  const resetChapters = () => {
    setChapters([]);
    setSelectedChapter(null);
    setSelectedSubItem(null);
    setExpandedChapter(null); // Reset expandedChapter
  };

  const addSubItem = (chapter, newSubItem) => {
    setChapters(prevChapters => 
      prevChapters.map(ch =>
        ch.id === chapter.id
          ? { ...ch, subItems: [...ch.subItems, newSubItem] }
          : ch
      )
    );
  };
  const editSubItem = (chapter, subItemToEdit, newText) => {
    setChapters(prevChapters =>
      prevChapters.map(ch =>
        ch.id === chapter.id
          ? {
              ...ch,
              subItems: ch.subItems.map(subItem =>
                subItem.item === subItemToEdit.item
                  ? { ...subItem, item: newText }
                  : subItem
              )
            }
          : ch
      )
    );
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
        addChapter,
        resetChapters,
        addSubItem, // Provide addSubItem
        expandedChapter, // Provide expandedChapter
        setExpandedChapter, // Provide setExpandedChapter
        editSubItem, // Add this
      }}
    >
      {children}
    </JsonState.Provider>
  );
};

export const useChapter = () => useContext(JsonState);
