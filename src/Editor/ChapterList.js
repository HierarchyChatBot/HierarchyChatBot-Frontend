// Editor/ChapterList.js

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ChapterObj from './ChapterObj';

const ChapterList = ({ chapters, reorderChapters, onEditClick, onDeleteClick, onChapterClick, selectedChapter }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If there's no destination, exit
    reorderChapters(result.source.index, result.destination.index);
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
                      onChapterClick={onChapterClick} // Add the chapter click handler
                      isSelected={selectedChapter && chapter.id === selectedChapter.id} // Highlight the selected chapter
                    />
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
