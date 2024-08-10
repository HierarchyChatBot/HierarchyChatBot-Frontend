// ChatRight.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonState';
import { useHistory } from '../HistoryHandler';

const ChatRight = () => {
  const { selectedChapter, selectedSubItem } = useChapter();
  const { getHistory, addMessage } = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentKey, setCurrentKey] = useState('[null, null]');

  useEffect(() => {
    if (selectedChapter && selectedSubItem) {
      const chapterId = selectedChapter.id;
      const subItemId = selectedSubItem.item; // Assuming item is unique within the chapter
      setCurrentKey(`[${chapterId}, ${subItemId}]`);
    } else {
      setCurrentKey('[null, null]');
    }
  }, [selectedChapter, selectedSubItem]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const compressMessages = (messages) => {
    return messages.map(message => `${message.sender}: ${message.text}`).join(' | ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue.trim() || isLoading) {
      return;
    }

    setIsLoading(true);

    if (!selectedChapter || !selectedSubItem) {
      console.error('Chapter or subitem is not selected.');
      setIsLoading(false);
      return;
    }

    const chapterId = selectedChapter.id;
    const subItemId = selectedSubItem.item;
    const newUserMessage = { text: inputValue, timestamp: new Date().toISOString(), sender: 'user' };
    const updatedMessages = [...getHistory(chapterId, subItemId), newUserMessage];

    addMessage(chapterId, subItemId, newUserMessage);

    setInputValue('');

    const compressedHistory = compressMessages(updatedMessages);

    try {
      const response = await fetch('http://localhost:5030/process-string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_string: compressedHistory }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      addMessage(chapterId, subItemId, { text: data.result, timestamp: new Date().toISOString(), sender: 'bot' });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      addMessage(chapterId, subItemId, { text: 'There was an error processing your request.', timestamp: new Date().toISOString(), sender: 'bot' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: '#f9f9f9' }} className="column">
      <h2>Chat to AI</h2>
      <div style={{ marginBottom: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {getHistory(selectedChapter ? selectedChapter.id : '', selectedSubItem ? selectedSubItem.item : '').map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#e8eaf6',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '5px',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message"
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '10px 20px', 
            color: 'white', 
            backgroundColor: isLoading ? '#b0bec5' : '#6200ea', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        <strong>Current Key:</strong> {currentKey}
      </div>
    </div>
  );
};

export default ChatRight;
