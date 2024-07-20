// ChapterContext.js

import React, { createContext, useState, useContext } from 'react';

const ChapterContext = createContext();

export const ChapterProvider = ({ children }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  return (
    <ChapterContext.Provider value={{ selectedChapter, setSelectedChapter }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapter = () => useContext(ChapterContext);