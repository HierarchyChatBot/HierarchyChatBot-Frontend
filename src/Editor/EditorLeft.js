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
    selectedChapter, // Add this to highlight the selected chapter
  } = useChapter();

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedSubItem(null);
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
        onChapterClick={handleChapterClick} // Pass the click handler
        selectedChapter={selectedChapter} // Pass the selected chapter for highlighting
      />
    </div>
  );
};

export default EditorLeft;
