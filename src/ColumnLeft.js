// ColumnLeft.js

import React, { useEffect, useState } from 'react';
import { useChapter } from './ChapterContext';

const ColumnLeft = () => {
  const [chapters, setChapters] = useState([]);
  const { selectedChapter, setSelectedChapter, setSelectedSubItem } = useChapter();
  const [expandedChapter, setExpandedChapter] = useState(null);

  useEffect(() => {
    fetch('/chapters.json')
      .then(response => response.json())
      .then(data => setChapters(data))
      .catch(error => console.error('Error fetching the chapters:', error));
  }, []);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter);
    setSelectedSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

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

  const subItemStyles = {
    marginLeft: '20px',
    cursor: 'pointer',
  };

  return (
    <div style={columnStyles} className="column left-column">
      <h2>Chapters</h2>
      <div style={chaptersListStyles} className="chapters-list">
        {chapters.map((chapter, index) => (
          <div key={index}>
            <div
              style={chapterStyles}
              className="chapter"
              onClick={() => handleChapterClick(chapter)}
            >
              <h3>{chapter.title}</h3>
            </div>
            {expandedChapter === chapter && chapter.subItems && (
              <div>
                {chapter.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    style={subItemStyles}
                    className="sub-item"
                    onClick={() => handleSubItemClick(subItem)}
                  >
                    {subItem.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLeft;
