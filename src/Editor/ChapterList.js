// Editor/ChapterList.js

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ChapterItem from './ChapterItem';

const ChapterList = ({ chapters, reorderChapters, onEditClick, onDeleteClick }) => {
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
                key={chapter.id}  // Use the unique ID here
                draggableId={chapter.id}  // Use the unique ID here
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ChapterItem
                      chapter={chapter}
                      onEditClick={onEditClick}
                      onDeleteClick={onDeleteClick}
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
