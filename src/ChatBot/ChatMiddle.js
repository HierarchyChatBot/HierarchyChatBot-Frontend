// ChatMiddle.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonState';
import { useHistory } from '../HistoryHandler';

const ChatMiddle = () => {
  const { selectedChapter, selectedSubItem, chapters } = useChapter();
  const { getResult, setResult, getCurrentKey, getChapterIndex, getSubItemIndex  } = useHistory();
  
  const [editableResult, setEditableResult] = useState('');
  const [currentKey, setCurrentKey] = useState('[null, null]');

  useEffect(() => {
    if (selectedChapter && selectedSubItem) {
      const chapterIndex = getChapterIndex(chapters, selectedChapter);
      const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
      
      setCurrentKey(getCurrentKey(chapters, selectedChapter, selectedSubItem));
      
      const result = getResult(chapterIndex, subItemIndex);
      setEditableResult(result || '');
    } else {
      setCurrentKey('[null, null]');
      setEditableResult('');
    }
  }, [selectedChapter, selectedSubItem, getResult, chapters, getCurrentKey]);

  const handleResultChange = (e) => {
    setEditableResult(e.target.value);
  };

  const handleResultSave = () => {
    if (selectedChapter && selectedSubItem) {
      const chapterIndex = getChapterIndex(chapters, selectedChapter);
      const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
      setResult(chapterIndex, subItemIndex, editableResult);
    }
  };

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
          <div style={{ marginTop: '20px' }}>
            <h3>Result:</h3>
            <textarea
              value={editableResult}
              onChange={handleResultChange}
              onBlur={handleResultSave}
              rows="5"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              placeholder="Edit the result here..."
            />
          </div>
        </div>
      ) : (
        <p>Select a chapter to view its description.</p>
      )}
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        <strong>Current Key:</strong> {currentKey}
      </div>
    </div>
  );
};

export default ChatMiddle;
