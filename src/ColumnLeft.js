// ColumnLeft.js

import React, { useEffect, useState } from 'react';
import { useChapter } from './ChapterContext';

const ColumnLeft = () => {
  const [chapters, setChapters] = useState([]);
  const { setSelectedChapter } = useChapter();

  useEffect(() => {
    fetch('/chapters.json')
      .then(response => response.json())
      .then(data => setChapters(data))
      .catch(error => console.error('Error fetching the chapters:', error));
  }, []);

  const columnStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    overflowY: 'auto',
    maxHeight: '80vh',
  };

  const chaptersListStyles = {
    display: 'flex',
    flexDirection: 'column',
  };

  const chapterStyles = {
    marginBottom: '10px',
    cursor: 'pointer',
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  return (
    <div style={columnStyles} className="column left-column">
      <h2>Chapters</h2>
      <div style={chaptersListStyles} className="chapters-list">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            style={chapterStyles}
            className="chapter"
            onClick={() => handleChapterClick(chapter)}
          >
            <h3>{chapter.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLeft;