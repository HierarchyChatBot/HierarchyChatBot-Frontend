// Editor/SubItemList.js

import React, { useState } from 'react';

const SubItemList = ({ subItems, onReorder, onDelete, onSubItemClick, selectedSubItem, onEdit }) => {
  const [editingSubItem, setEditingSubItem] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleReorder = (index, direction) => {
    if (direction === 'up' && index > 0) {
      onReorder(index, index - 1);
    } else if (direction === 'down' && index < subItems.length - 1) {
      onReorder(index, index + 1);
    }
  };

  const handleEditClick = (subItem) => {
    setEditingSubItem(subItem);
    setEditedText(subItem.item);
  };

  const handleSaveEdit = () => {
    if (editingSubItem) {
      onEdit(editingSubItem, editedText);
      setEditingSubItem(null);
    }
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      {subItems.map((subItem, index) => (
        <div
          key={subItem.item}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px',
            backgroundColor: selectedSubItem && subItem.item === selectedSubItem.item ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
            marginBottom: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => onSubItemClick(subItem)}
        >
          {editingSubItem === subItem ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleSaveEdit}
              autoFocus
            />
          ) : (
            <span>{subItem.item}</span>
          )}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReorder(index, 'up');
              }}
              style={{ marginRight: '5px', color: 'blue', cursor: 'pointer' }}
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReorder(index, 'down');
              }}
              style={{ marginRight: '5px', color: 'blue', cursor: 'pointer' }}
            >
              ↓
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(subItem);
              }}
              style={{ marginRight: '5px', color: 'green', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(subItem);
              }}
              style={{ color: 'red', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubItemList;