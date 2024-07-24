// ChatLeft.js

import React from 'react';
import { useChapter } from '../JsonState';

const ChatLeft = () => {
  const { chapters, selectedChapter, setSelectedChapter, setSelectedSubItem, selectedSubItem } = useChapter();
  const [expandedChapter, setExpandedChapter] = React.useState(null);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setExpandedChapter(chapter);
    setSelectedSubItem(null);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const renderSubItems = (subItems) => {
    return subItems.map((subItem) => (
      <div key={subItem.item}> {/* Use the subItem.item as a unique key */}
        <div
          style={{
            marginLeft: '20px',
            cursor: 'pointer',
            backgroundColor: selectedSubItem && subItem.item === selectedSubItem.item ? '#e0e0e0' : 'transparent',
            borderRadius: '4px',
            padding: '5px',
            transition: 'background-color 0.3s ease',
          }}
          onClick={() => handleSubItemClick(subItem)}
        >
          {subItem.item}
        </div>
        {subItem.subItems && renderSubItems(subItem.subItems)}
      </div>
    ));
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

  return (
    <div style={columnStyles} className="column left-column">
      <h2>Chapters</h2>
      <div style={chaptersListStyles} className="chapters-list">
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <div
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: selectedChapter && chapter.id === selectedChapter.id ? '#e0e0e0' : 'transparent',
                borderRadius: '4px',
                padding: '10px',
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => handleChapterClick(chapter)}
            >
              <h3>{chapter.chapter}</h3> {/* Use chapter.chapter instead of chapter.title */}
            </div>
            {expandedChapter === chapter && chapter.subItems && renderSubItems(chapter.subItems)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLeft;
