// Editor/ChapterObj.js

import React from 'react';
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
  selectedSubItem,
  onAddSubItem,
}) => {
  const [newChapterTitle, setNewChapterTitle] = React.useState(chapter.chapter);

  const handleTitleChange = (e) => {
    setNewChapterTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (newChapterTitle !== chapter.chapter) {
      onEditClick(chapter, newChapterTitle);
    }
  };

  return (
    <div
      style={{
        marginBottom: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '10px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div
        onClick={() => onChapterClick(chapter)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isSelected ? '#e0e0e0' : '#fff',
          borderRadius: '4px',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        <input
          type="text"
          value={newChapterTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginBottom: '10px'
          }}
        />
        {isSelected && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddSubItem(chapter);
              }}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                color: 'blue',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#f0f8ff',
              }}
            >
              Add Item
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(chapter);
              }}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                color: 'red',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#ffe0e0',
                marginLeft: 'auto', // Move this button to the rightmost
              }}
            >
              Delete Chapter
            </button>
          </div>
        )}
      </div>

      {/* Render subitems only if chapter is selected */}
      {isSelected && (
        <div style={{ marginLeft: '20px' }}>
          <SubItemList
            subItems={chapter.subItems}
            onReorder={(fromIndex, toIndex) => onSubItemReorder(chapter, fromIndex, toIndex)}
            onDelete={(subItem) => onSubItemDelete(chapter, subItem)}
            onSubItemClick={(subItem) => onSubItemClick(subItem)}
            selectedSubItem={selectedSubItem}
          />
        </div>
      )}
    </div>
  );
};

export default ChapterObj;
