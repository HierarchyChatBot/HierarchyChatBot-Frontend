// ChatLayout.js

import React from 'react';
import ChatLeft from './ChatLeft';
import ChatMiddle from './ChatMiddle';
import ChatRight from './ChatRight';
import AutoMiddle from './AutoMiddle';
import AutoLeft from './AutoLeft';
import { useChapter } from '../JsonState';

const ChatLayout = () => {
  const { mode } = useChapter(); // Get the mode from useChapter

  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px',
    padding: '10px',
  };

  return (
    <div style={baseStyles} className="three-column-layout">
      {mode === 'Automation' ? <AutoLeft /> : <ChatLeft />}
      {mode === 'Automation' ? <AutoMiddle /> : <ChatMiddle />}
      <ChatRight />
    </div>
  );
};

export default ChatLayout;
