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
    selectedChapter,
    selectedSubItem,
    setExpandedChapter,
    expandedChapter,
  } = useChapter();

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter);
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

  const handleSubItemReorder = (chapter, fromIndex, toIndex) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapter.id) {
        const updatedSubItems = Array.from(ch.subItems);
        const [movedSubItem] = updatedSubItems.splice(fromIndex, 1);
        updatedSubItems.splice(toIndex, 0, movedSubItem);
        return { ...ch, subItems: updatedSubItems };
      }
      return ch;
    });
    setChapters(updatedChapters);
  };

  const handleSubItemDelete = (chapter, subItemToDelete) => {
    const updatedChapters = chapters.map((ch) => {
      if (ch.id === chapter.id) {
        const updatedSubItems = ch.subItems.filter((subItem) => subItem.item !== subItemToDelete.item);
        return { ...ch, subItems: updatedSubItems };
      }
      return ch;
    });
    setChapters(updatedChapters);
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
        onChapterClick={handleChapterClick}
        onSubItemReorder={handleSubItemReorder}
        onSubItemDelete={handleSubItemDelete}
        onSubItemClick={handleSubItemClick}
        selectedChapter={selectedChapter}
        selectedSubItem={selectedSubItem}
        expandedChapter={expandedChapter}
      />
    </div>
  );
};

export default EditorLeft;
