// HistoryHandler.js

import { createContext, useState, useContext } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  // Initialize historyMap with an array of key-value pairs that represent chapter and subitem history
  const [historyMap, setHistoryMap] = useState(new Map());

  const getHistory = (chapterId, subItemId) => {
    const key = JSON.stringify([chapterId, subItemId]);
    return historyMap.get(key) || [];
  };

  const addMessage = (chapterId, subItemId, message) => {
    const key = JSON.stringify([chapterId, subItemId]);
    setHistoryMap(prevMap => {
      const currentHistory = prevMap.get(key) || [];
      return new Map(prevMap).set(key, [...currentHistory, message]);
    });
  };

  const removeHistory = (chapterId, subItemId) => {
    const key = JSON.stringify([chapterId, subItemId]);
    setHistoryMap(prevMap => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  const resetHistories = () => {
    setHistoryMap(new Map());
  };

  // Convert historyMap to a JSON string
  const saveHistoryToJson = () => {
    const historyArray = Array.from(historyMap.entries()); // Convert Map to array of [key, value] pairs
    return JSON.stringify(historyArray, null, 2); // Pretty-print JSON with 2 spaces of indentation
  };

  // Load historyMap from a JSON string
  const loadHistoryFromJson = (json) => {
    const historyArray = JSON.parse(json); // Parse JSON string to an array
    setHistoryMap(new Map(historyArray)); // Convert array back to Map and set it as historyMap
  };

  return (
    <HistoryContext.Provider value={{ getHistory, addMessage, removeHistory, resetHistories, saveHistoryToJson, loadHistoryFromJson }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
