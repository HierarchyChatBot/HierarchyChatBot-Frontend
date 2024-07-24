// ChatLayout.js

import React from 'react';
import ColumnLeft from './ChatLeft';
import ColumnMiddle from './ChatMiddle';
import ColumnRight from './ChatRight';

const ChatLayout = () => {
  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
    padding: '10px',
  };

  return (
    <div style={baseStyles} className="three-column-layout">
      <ColumnLeft />
      <ColumnMiddle />
      <ColumnRight />
    </div>
  );
};

export default ChatLayout;