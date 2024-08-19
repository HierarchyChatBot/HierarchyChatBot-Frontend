// Body.js

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useChapter } from './JsonState';
import { useHistory } from './HistoryHandler';

const Body = () => {
  const { loadChaptersFromFile, saveChaptersToFile, resetChapters } = useChapter();
  const { saveHistoryToJson, loadHistoryFromJson, resetHistories } = useHistory();
  const fileInputRef = useRef(null);
  const chatFileInputRef = useRef(null); // Ref for chat history file input

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetChapters(); // Clear the existing state before loading new data
      loadChaptersFromFile(file);
    }
  };

  const handleChatFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetHistories(); // Clear the existing chat history before loading new data
      const reader = new FileReader();
      reader.onload = (e) => {
        loadHistoryFromJson(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChatButtonClick = () => {
    chatFileInputRef.current.click();
  };

  const handleSaveClick = () => {
    saveChaptersToFile('chapters.json');
  };

  const handleSaveChatClick = () => {
    const chatHistoryJson = saveHistoryToJson();
    const blob = new Blob([chatHistoryJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleNewClick = () => {
    if (window.confirm('Are you sure you want to clear all chapters?')) {
      window.location.reload(); // Refresh the page
    }
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <button style={{ marginLeft: '10px' }}>Chat Bot</button>
        </Link>
        <Link to="/graph">
          <button style={{ marginLeft: '10px' }}>Graph Editor</button>
        </Link>
        <Link to="/editor">
          <button style={{ marginLeft: '10px' }}>Book Editor</button>
        </Link>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the default file input
        />
        <input
          type="file"
          accept=".json"
          onChange={handleChatFileUpload}
          ref={chatFileInputRef}
          style={{ display: 'none' }} // Hide the chat history file input
        />
        <button onClick={handleButtonClick} style={{ marginLeft: '10px' }}>Load Book</button>
        <button onClick={handleSaveClick} style={{ marginLeft: '10px' }}>Save Book</button>
        <button onClick={handleNewClick} style={{ marginLeft: '10px' }}>New Book</button>
        <button onClick={handleSaveChatClick} style={{ marginLeft: '10px' }}>Snapshot Chat</button>
        <button onClick={handleChatButtonClick} style={{ marginLeft: '10px' }}>Load Snapshot</button>
      </nav>
    </div>
  );
};

export default Body;
