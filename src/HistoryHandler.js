// HistoryHandler.js

import { createContext, useState, useContext } from 'react';

// Utility functions for index calculations
const getChapterIndex = (chapters, selectedChapter) => {
  return chapters.findIndex(ch => ch.id === selectedChapter.id);
};

const getSubItemIndex = (selectedChapter, selectedSubItem) => {
  return selectedChapter.subItems.findIndex(subItem => subItem.item === selectedSubItem.item);
};

const getCurrentKey = (chapters, selectedChapter, selectedSubItem) => {
  const chapterIndex = selectedChapter ? getChapterIndex(chapters, selectedChapter) : null;
  const subItemIndex = selectedSubItem ? getSubItemIndex(selectedChapter, selectedSubItem) : null;
  return `[${chapterIndex}, ${subItemIndex}]`;
};

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [historyMap, setHistoryMap] = useState(new Map());
  const [resultMap, setResultMap] = useState(new Map());

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
    setResultMap(new Map());
  };

  const saveHistoryToJson = () => {
    const historyArray = Array.from(historyMap.entries());
    const resultArray = Array.from(resultMap.entries());
    return JSON.stringify({
      History: Object.fromEntries(historyArray),
      Result: Object.fromEntries(resultArray),
    }, null, 2);
  };

  const loadHistoryFromJson = (json) => {
    const data = JSON.parse(json);
    if (data.History) {
      setHistoryMap(new Map(Object.entries(data.History)));
    }
    if (data.Result) {
      setResultMap(new Map(Object.entries(data.Result)));
    }
  };

  const setResult = (chapterId, subItemId, content) => {
    const key = JSON.stringify([chapterId, subItemId]);
    setResultMap(prevMap => new Map(prevMap).set(key, content));
  };

  const getResult = (chapterId, subItemId) => {
    const key = JSON.stringify([chapterId, subItemId]);
    return resultMap.get(key) || null;
  };

  return (
    <HistoryContext.Provider value={{
      getHistory,
      addMessage,
      removeHistory,
      resetHistories,
      saveHistoryToJson,
      loadHistoryFromJson,
      setResult,
      getResult,
      getChapterIndex,
      getSubItemIndex,
      getCurrentKey,
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
