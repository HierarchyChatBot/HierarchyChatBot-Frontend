// ChatRight.js

import React, { useState } from 'react';
import { useChapter } from '../JsonState';

const ChatRight = () => {
  const { chatHistory, addMessage } = useChapter();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addMessage({ text: inputValue, timestamp: new Date().toISOString() });
      setInputValue('');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: '#f9f9f9' }} className="column">
      <h2>Chat to AI</h2>
      <div style={{ marginBottom: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <strong>{new Date(msg.timestamp).toLocaleTimeString()}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRight;
