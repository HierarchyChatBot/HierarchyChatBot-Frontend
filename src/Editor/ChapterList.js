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
  onSubItemReorder,
  onSubItemDelete,
  onSubItemClick,
  onAddSubItem, // Include this
  selectedChapter,
  selectedSubItem,
  expandedChapter
}) => {
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
                key={chapter.id}
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
                      onChapterClick={onChapterClick}
                      onSubItemReorder={onSubItemReorder}
                      onSubItemDelete={onSubItemDelete}
                      onSubItemClick={onSubItemClick}
                      onAddSubItem={onAddSubItem} // Ensure this is passed down
                      selectedSubItem={selectedSubItem}
                      isSelected={selectedChapter && chapter.id === selectedChapter.id}
                      expandedChapter={expandedChapter}
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
