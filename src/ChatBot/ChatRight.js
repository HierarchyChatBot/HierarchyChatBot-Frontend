// ChatRight.js

import React, { useState } from 'react';
import { useChapter } from '../JsonState';

const ChatRight = () => {
  const { chatHistory, addMessage } = useChapter();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to compress the entire message history into a single string
  const compressMessages = (messages) => {
    return messages.map(message => `${message.sender}: ${message.text}`).join(' | ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputValue.trim() || isLoading) {
      return;
    }

    setIsLoading(true);

    const newUserMessage = { text: inputValue, timestamp: new Date().toISOString(), sender: 'user' };
    const updatedMessages = [...chatHistory, newUserMessage];

    // Display the user's message in the chat
    addMessage(newUserMessage);

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

      // Display the bot's reply in the chat
      addMessage({ text: data.result, timestamp: new Date().toISOString(), sender: 'bot' });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);

      // Optionally add an error message to the chat
      addMessage({ text: 'There was an error processing your request.', timestamp: new Date().toISOString(), sender: 'bot' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: '#f9f9f9' }} className="column">
      <h2>Chat to AI</h2>
      <div style={{ marginBottom: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {chatHistory.map((msg, index) => (
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
    </div>
  );
};

export default ChatRight;
