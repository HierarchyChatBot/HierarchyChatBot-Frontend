// Editor/ChapterIO.js

import React from 'react';

const ChapterIO = ({ newChapterTitle, onTitleChange, onSaveClick, onCancelClick, onAddItemClick }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    <input
      type="text"
      value={newChapterTitle}
      onChange={onTitleChange}
      style={{
        flexGrow: 1,
        marginRight: '10px',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
    <div style={{ marginLeft: 'auto' }}>
      <button
        onClick={onSaveClick}
        style={{
          marginLeft: '10px',
          color: 'green',
          cursor: 'pointer',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#e0ffe0',
        }}
      >
        Save
      </button>
      <button
        onClick={onCancelClick}
        style={{
          marginLeft: '10px',
          color: 'gray',
          cursor: 'pointer',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#f0f0f0',
        }}
      >
        Cancel
      </button>
      <button
        onClick={onAddItemClick}
        style={{
          marginLeft: '10px',
          color: 'blue',
          cursor: 'pointer',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#e0e0ff',
        }}
      >
        Add Item
      </button>
    </div>
  </div>
);

export default ChapterIO;
