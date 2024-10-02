// ChatRight.js

import React, { useState, useEffect } from 'react';
import { useChapter } from '../JsonState';
import { useHistory } from '../HistoryHandler';
import SERVER_URL from '../config';
import ConfigManager from '../ConfigManager';  // Import ConfigManager to handle settings

const ChatRight = () => {
  const { selectedChapter, selectedSubItem, chapters } = useChapter();
  const { getHistory, addMessage, getCurrentKey, getChapterIndex, getSubItemIndex, clearHistory } = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentKey, setCurrentKey] = useState('[null, null]');

  // Fetch llm_model and open_ai_key from ConfigManager
  const { llmModel, openAiKey } = ConfigManager.getSettings();

  useEffect(() => {
    setCurrentKey(getCurrentKey(chapters, selectedChapter, selectedSubItem));
  }, [selectedChapter, selectedSubItem, chapters, getCurrentKey]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const formatHistory = (messages) => {
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

    const chapterIndex = getChapterIndex(chapters, selectedChapter);
    const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
    const newUserMessage = { text: inputValue, timestamp: new Date().toISOString(), sender: 'user' };
    const updatedMessages = [...getHistory(chapterIndex, subItemIndex), newUserMessage];

    addMessage(chapterIndex, subItemIndex, newUserMessage);

    setInputValue('');

    const formattedHistory = formatHistory(updatedMessages);

    const compressedHistory = JSON.stringify({
      history: formattedHistory,
      ch_title: selectedChapter.title,
      ch_content: selectedChapter.description,
      sub_title: selectedSubItem.title,
      sub_content: selectedSubItem.description,
      user: inputValue
    });

    try {
      const response = await fetch(`${SERVER_URL}/process-string`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_string: compressedHistory,
          llm_model: llmModel,  // Add llm_model from ConfigManager
          open_ai_key: openAiKey  // Add open_ai_key from ConfigManager
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      addMessage(chapterIndex, subItemIndex, { text: data.result, timestamp: new Date().toISOString(), sender: 'bot' });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      addMessage(chapterIndex, subItemIndex, { text: 'There was an error processing your request.', timestamp: new Date().toISOString(), sender: 'bot' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (selectedChapter && selectedSubItem) {
      const chapterIndex = getChapterIndex(chapters, selectedChapter);
      const subItemIndex = getSubItemIndex(selectedChapter, selectedSubItem);
      clearHistory(chapterIndex, subItemIndex);
    }
  };

  // Check if currentKey contains "null"
  const isNullKey = currentKey.includes('null');

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', backgroundColor: '#f9f9f9' }} className="column">
      <h2>Chat to AI</h2>

      {/* Conditionally render based on isNullKey */}
      {!isNullKey ? (
        <>
          <div style={{ marginBottom: '20px', height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
            {getHistory(selectedChapter ? getChapterIndex(chapters, selectedChapter) : '', selectedSubItem ? getSubItemIndex(selectedChapter, selectedSubItem) : '').map((msg, index) => (
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
          <button
            onClick={handleClearHistory}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              color: 'white',
              backgroundColor: '#f44336',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear History
          </button>
        </>
      ) : (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>Please choose a chapter with a sub-chapter to chat with AI.</p>
        </div>
      )}

      <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        <strong>Current Key:</strong> {currentKey}
      </div>
    </div>
  );
};

export default ChatRight;
