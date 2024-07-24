// Editor/ChapterList.js

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ChapterObj from './ChapterObj';

const ChapterList = ({
  chapters,
  reorderChapters,
  onEditClick,
  onDeleteClick,
  onChapterClick,
  onSubItemClick, // Accept the subitem click handler
  selectedChapter,
  selectedSubItem,
  expandedChapter // Accept the expanded chapter
}) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If there's no destination, exit
    reorderChapters(result.source.index, result.destination.index);
  };

  const renderSubItems = (subItems) => {
    return subItems.map((subItem) => (
      <div key={subItem.item}>
        <div
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            backgroundColor: selectedSubItem && subItem.item === selectedSubItem.item ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
            padding: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => onSubItemClick(subItem)} // Use the subitem click handler
        >
          {subItem.item}
        </div>
        {subItem.subItems && renderSubItems(subItem.subItems)} {/* Recursively render nested subItems */}
      </div>
    ));
  };

  return (
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
                key={chapter.id} // Use a unique ID for each chapter
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ChapterObj
                      chapter={chapter}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
                      onChapterClick={() => onChapterClick(chapter)} // Add the chapter click handler
                      isSelected={selectedChapter && chapter.id === selectedChapter.id} // Highlight the selected chapter
                    />
                    {expandedChapter === chapter && chapter.subItems && renderSubItems(chapter.subItems)} {/* Render subItems if the chapter is expanded */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChapterList;
