// Editor/EditChapter.js

import React from 'react';

const EditChapter = ({ newTitle, onTitleChange, onSaveClick, onCancelClick }) => (
  <div>
    <input
      type="text"
      value={newTitle}
      onChange={onTitleChange}
    />
    <button onClick={onSaveClick} style={{ marginLeft: '10px', color: 'green', cursor: 'pointer' }}>
      Save
    </button>
    <button onClick={onCancelClick} style={{ marginLeft: '10px', color: 'gray', cursor: 'pointer' }}>
      Cancel
    </button>
  </div>
);

export default EditChapter;
