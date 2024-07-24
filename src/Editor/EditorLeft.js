// Editor/EditorLeft.js

import React from 'react';
import { useChapter } from '../JsonState';
import ChapterList from './ChapterList';

const EditorLeft = () => {
  const {
    chapters,
    removeChapter,
    setSelectedChapter,
    setSelectedSubItem,
    reorderChapters,
    setChapters,
    addChapter,
    selectedChapter, // To highlight the selected chapter
    selectedSubItem, // To highlight the selected subitem
    setExpandedChapter,
    expandedChapter // To manage expanded chapters
  } = useChapter();

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter); // Expand the chapter
    setSelectedSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const handleEditClick = (chapter, newChapterTitle) => {
    setChapters((prevChapters) =>
      prevChapters.map((ch) =>
        ch.id === chapter.id ? { ...ch, chapter: newChapterTitle } : ch
      )
    );
  };

  const handleAddChapter = () => {
    const newChapter = {
      chapter: 'New Chapter',
      description: '',
      subItems: [],
    };
    addChapter(newChapter);
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        overflowY: 'auto',
        maxHeight: '80vh',
      }}
      className="column left-column"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '1em' }}>Chapters</span>
        <button
          onClick={handleAddChapter}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Add Chapter
        </button>
      </div>
      <ChapterList
        chapters={chapters}
        reorderChapters={reorderChapters}
        onEditClick={handleEditClick}
        onDeleteClick={removeChapter}
        onChapterClick={handleChapterClick} // Pass the chapter click handler
        onSubItemClick={handleSubItemClick} // Pass the subitem click handler
        selectedChapter={selectedChapter} // Pass the selected chapter for highlighting
        selectedSubItem={selectedSubItem} // Pass the selected subitem for highlighting
        expandedChapter={expandedChapter} // Pass the expanded chapter
      />
    </div>
  );
};

export default EditorLeft;
