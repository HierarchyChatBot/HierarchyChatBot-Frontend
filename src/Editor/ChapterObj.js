// Editor/ChapterObj.js

import React from 'react';
import ChapterIO from './ChapterIO';

const ChapterObj = ({ chapter, onEditClick, onDeleteClick, onChapterClick, isSelected }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newChapterTitle, setNewChapterTitle] = React.useState(chapter.chapter);

  const handleSaveClick = () => {
    onEditClick(chapter, newChapterTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewChapterTitle(chapter.chapter);
  };

  const ChapterObjStyles = {
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between', // Keep elements spaced between
    alignItems: 'center',
    padding: '10px',
    backgroundColor: isSelected ? '#e0e0e0' : '#fff', // Highlight selected chapter
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div
      style={ChapterObjStyles}
      onClick={() => onChapterClick(chapter)} // Call the click handler
    >
      {isEditing ? (
        <ChapterIO
          newChapterTitle={newChapterTitle}
          onTitleChange={(e) => setNewChapterTitle(e.target.value)}
          onSaveClick={handleSaveClick}
          onCancelClick={handleCancelClick}
        />
      ) : (
        <>
          <h3 style={{ margin: 0 }}>{chapter.chapter}</h3>
          <div style={{ marginLeft: 'auto' }}>
            {/* This new container will push the buttons to the right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop click event from affecting parent div
                onDeleteClick(chapter);
              }}
              style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
            >
              Delete
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default ChapterObj;
