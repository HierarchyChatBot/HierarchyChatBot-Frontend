// Editor/EditChapter.js

import React from 'react';

const EditChapter = ({ newTitle, onTitleChange, onSaveClick, onCancelClick }) => (
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
      value={newTitle}
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
    </div>
  </div>
);

export default EditChapter;
