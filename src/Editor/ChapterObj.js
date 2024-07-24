// Editor/ChapterObj.js

import React from 'react';
import ChapterIO from './ChapterIO';
import SubItemList from './SubItemList';

const ChapterObj = ({
  chapter,
  onEditClick,
  onDeleteClick,
  onChapterClick,
  isSelected,
  onSubItemReorder,
  onSubItemDelete,
  onSubItemClick,
  selectedSubItem
}) => {
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

  return (
    <div
      style={{
        marginBottom: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isSelected ? '#e0e0e0' : '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '10px',
        transition: 'background-color 0.3s ease',
      }}
      onClick={() => onChapterClick(chapter)}
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
                e.stopPropagation();
                onDeleteClick(chapter);
              }}
              style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        </>
      )}
      <SubItemList
        subItems={chapter.subItems}
        onReorder={(fromIndex, toIndex) => onSubItemReorder(chapter, fromIndex, toIndex)}
        onDelete={(subItem) => onSubItemDelete(chapter, subItem)}
        onSubItemClick={(subItem) => onSubItemClick(subItem)}
        selectedSubItem={selectedSubItem} // Pass selectedSubItem here
      />
    </div>
  );
};

export default ChapterObj;
