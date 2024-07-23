// Editor/EditorLeft.js

import React from 'react';
import { useChapter } from '../JsonContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EditorLeft = () => {
  const {
    chapters,
    removeChapter,
    setSelectedChapter,
    setSelectedSubItem,
    reorderChapters,
    setChapters, // Add this for updating chapters
  } = useChapter();

  const [expandedChapter, setExpandedChapter] = React.useState(null);
  const [editingChapter, setEditingChapter] = React.useState(null);
  const [newTitle, setNewTitle] = React.useState('');

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter);
    setSelectedSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const handleDeleteClick = (chapter) => {
    removeChapter(chapter);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If there's no destination, exit
    reorderChapters(result.source.index, result.destination.index);
  };

  const handleEditClick = (chapter) => {
    setEditingChapter(chapter);
    setNewTitle(chapter.title);
  };

  const handleSaveClick = () => {
    setChapters(prevChapters =>
      prevChapters.map(chapter =>
        chapter === editingChapter ? { ...chapter, title: newTitle } : chapter
      )
    );
    setEditingChapter(null);
    setNewTitle('');
  };

  const handleCancelClick = () => {
    setEditingChapter(null);
    setNewTitle('');
  };

  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    overflowY: 'auto',
    maxHeight: '80vh',
  };

  const chapterStyles = {
    marginBottom: '10px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const subItemStyles = {
    marginLeft: '20px',
    cursor: 'pointer',
    padding: '5px',
  };

  const buttonStyles = {
    marginLeft: '10px',
    color: 'red',
    cursor: 'pointer',
  };

  const editButtonStyles = {
    marginLeft: '10px',
    color: 'blue',
    cursor: 'pointer',
  };

  return (
    <div style={columnStyles} className="column left-column">
      <h2>Chapters</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="chaptersList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {chapters.map((chapter, index) => (
                <Draggable
                  key={chapter.title}
                  draggableId={chapter.title}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...chapterStyles,
                        ...provided.draggableProps.style,
                      }}
                      className="chapter"
                      onClick={() => handleChapterClick(chapter)}
                    >
                      {editingChapter === chapter ? (
                        <div>
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                          <button onClick={handleSaveClick} style={buttonStyles}>
                            Save
                          </button>
                          <button onClick={handleCancelClick} style={buttonStyles}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3>{chapter.title}</h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Stop click event from affecting parent div
                              handleDeleteClick(chapter);
                            }}
                            style={buttonStyles}
                          >
                            -
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(chapter);
                            }}
                            style={editButtonStyles}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default EditorLeft;
