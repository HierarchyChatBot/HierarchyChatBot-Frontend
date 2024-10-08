// ChatMiddle.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonState';
import { useHistory } from '../HistoryHandler';

const ChatMiddle = () => {
  const { selectedChapter, selectedSubItem, chapters, mode } = useChapter();
  const { getPrompt, setPrompt, getCurrentKey, getChapterIndex, getSubItemIndex } = useHistory();

  const [editablePrompt, setEditablePrompt] = useState('');
  const [currentKey, setCurrentKey] = useState('[null, null]');

  useEffect(() => {
    if (selectedChapter && selectedSubItem) {
      const chapterIndex = getChapterIndex(chapters, selectedChapter);
      const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
      
      setCurrentKey(getCurrentKey(chapters, selectedChapter, selectedSubItem));
      
      const prompt = getPrompt(chapterIndex, subItemIndex);
      setEditablePrompt(prompt || '');
    } else {
      setCurrentKey('[null, null]');
      setEditablePrompt('');
    }
  }, [selectedChapter, selectedSubItem, getPrompt, chapters, getCurrentKey]);

  const handlePromptChange = (e) => {
    setEditablePrompt(e.target.value);
  };

  const handlePromptSave = () => {
    if (selectedChapter && selectedSubItem) {
      const chapterIndex = getChapterIndex(chapters, selectedChapter);
      const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
      setPrompt(chapterIndex, subItemIndex, editablePrompt);
    }
  };

  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  // Check if currentKey contains "null"
  const isNullKey = currentKey.includes('null');

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

          {/* Conditional Rendering based on isNullKey */}
          {!isNullKey ? (
            <div style={{ marginTop: '20px' }}>
              <h3>{mode === 'Consult' ? 'Answer:' : 'Prompt:'}</h3>
              <textarea
                value={editablePrompt}
                onChange={handlePromptChange}
                onBlur={handlePromptSave}
                rows="5"
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                placeholder={mode === 'Consult' ? "Edit the answer here..." : "Edit the prompt here..."}
              />
            </div>
          ) : (
            <div style={{ marginTop: '20px', color: 'red' }}>
              <p>Please choose a sub-chapter</p>
            </div>
          )}
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
