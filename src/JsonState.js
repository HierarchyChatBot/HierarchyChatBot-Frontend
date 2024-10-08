// JsonState.js

import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const JsonState = createContext();

export const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [mode, setMode] = useState('Workflow');
  const [selectedNode, setSelectedNode] = useState(null);

  // Add message to chat history
  const addMessage = (message) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  };

  // Load chapters from file
  const loadChaptersFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        // Set chapters and ensure each chapter gets a unique ID
        setChapters(
          data.chapters.map((chapter) => ({
            ...chapter,
            id: uuidv4(), // Generate a unique ID for each chapter
          }))
        );

        // Set the mode from the loaded data, or use default 'Workflow' if not present
        if (data.mode) {
          setMode(data.mode);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  // Save chapters to file
  const saveChaptersToFile = (filename) => {
    const removeIds = (item) => {
      if (Array.isArray(item)) {
        return item.map(removeIds);
      } else if (typeof item === 'object' && item !== null) {
        const { id, ...rest } = item;
        return Object.fromEntries(
          Object.entries(rest).map(([key, value]) => [key, removeIds(value)])
        );
      }
      return item;
    };

    const jsonData = {
      chapters: removeIds(chapters),
      mode: mode,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Remove a chapter
  const removeChapter = (chapterToRemove) => {
    setChapters((prevChapters) =>
      prevChapters.filter((chapter) => chapter.id !== chapterToRemove.id)
    );
  };

  // Reorder chapters
  const reorderChapters = (startIndex, endIndex) => {
    setChapters((prevChapters) => {
      const newChapters = Array.from(prevChapters);
      const [movedChapter] = newChapters.splice(startIndex, 1);
      newChapters.splice(endIndex, 0, movedChapter);
      return newChapters;
    });
  };

  // Add a new chapter
  const addChapter = (newChapter) => {
    setChapters((prevChapters) => [
      ...prevChapters,
      { ...newChapter, id: uuidv4() },
    ]);
  };

  // Reset chapters
  const resetChapters = () => {
    setChapters([]);
    setSelectedChapter(null);
    setSelectedSubItem(null);
    setExpandedChapter(null);
  };

  // Add a sub-item to a chapter
  const addSubItem = (chapter, newSubItem) => {
    setChapters((prevChapters) =>
      prevChapters.map((ch) =>
        ch.id === chapter.id
          ? { ...ch, subItems: [...ch.subItems, newSubItem] }
          : ch
      )
    );
  };

  // Edit sub-item title
  const editSubItem = (chapter, subItemToEdit, newTitle) => {
    setChapters((prevChapters) =>
      prevChapters.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              subItems: ch.subItems.map((subItem) =>
                subItem.item === subItemToEdit.item
                  ? { ...subItem, item: newTitle }
                  : subItem
              ),
            }
          : ch
      )
    );
  };

  // Edit sub-item description
  const editSubItemDescription = (chapter, subItemToEdit, newDescription) => {
    setChapters((prevChapters) =>
      prevChapters.map((ch) =>
        ch.id === chapter.id
          ? {
              ...ch,
              subItems: ch.subItems.map((subItem) =>
                subItem.item === subItemToEdit.item
                  ? { ...subItem, description: newDescription }
                  : subItem
              ),
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
        addSubItem,
        expandedChapter,
        setExpandedChapter,
        editSubItem,
        editSubItemDescription,
        mode,
        setMode,
        selectedNode,
        setSelectedNode,
      }}
    >
      {children}
    </JsonState.Provider>
  );
};

export const useChapter = () => useContext(JsonState);
