// ColumnMiddle.js

import React from 'react';
import { useChapter } from './ChapterContext';

const ColumnMiddle = () => {
  const { selectedChapter, selectedSubItem } = useChapter();

  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={columnStyles} className="column">
      <h2>Chapter Description</h2>
      {selectedChapter ? (
        <div>
          <h3>{selectedChapter.title}</h3>
          <p>{selectedChapter.description}</p>
          {selectedSubItem && (
            <div>
              <h4>{selectedSubItem.title}</h4>
              <p>{selectedSubItem.description}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Select a chapter to view its description.</p>
      )}
    </div>
  );
};

export default ColumnMiddle;
