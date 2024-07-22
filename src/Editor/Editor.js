// Editor.js
// EditorLayout.js
import React from 'react';
import EditorLeft from './EditorLeft';
import EditorRight from './EditorRight';

const EditorLayout = () => {
  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '10px',
    padding: '10px',
  };

  return (
    <div style={baseStyles} className="editor-layout">
      <EditorLeft />
      <EditorRight />
    </div>
  );
};

export default EditorLayout;
