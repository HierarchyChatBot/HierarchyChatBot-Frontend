// HistoryHandler.js

import { createContext, useState, useContext } from 'react';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
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

  return (
    <HistoryContext.Provider value={{ getHistory, addMessage, removeHistory, resetHistories }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
