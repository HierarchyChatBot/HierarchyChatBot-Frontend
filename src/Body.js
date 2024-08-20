// Body.js

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useChapter } from './JsonState';
import { useHistory } from './HistoryHandler';
import ConvertGraph from './ChatBot/ConvertGraph';  // Import ConvertGraph component

const Body = () => {
  const { loadChaptersFromFile, saveChaptersToFile, resetChapters } = useChapter();
  const { saveHistoryToJson, loadHistoryFromJson, resetHistories } = useHistory();

  const fileInputRef = useRef(null);
  const chatFileInputRef = useRef(null);

  // Handler functions
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetChapters();
      loadChaptersFromFile(file);
    }
  };

  const handleChatFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      resetHistories();
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

  const handleSaveSnapshotClick = () => {
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

  const handleLoadSnapshotClick = () => {
    chatFileInputRef.current.click();
  };

  const handleNewClick = () => {
    if (window.confirm('Are you sure you want to clear all chapters?')) {
      window.location.reload();
    }
  };

  // Render the ConvertGraph component conditionally
  const [showGraph, setShowGraph] = React.useState(false);

  const handleGenGraphClick = () => {
    setShowGraph(true);
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
          style={{ display: 'none' }}
        />
        <input
          type="file"
          accept=".json"
          onChange={handleChatFileUpload}
          ref={chatFileInputRef}
          style={{ display: 'none' }}
        />
        <button onClick={handleButtonClick} style={{ marginLeft: '10px' }}>Load Book</button>
        <button onClick={handleSaveClick} style={{ marginLeft: '10px' }}>Save Book</button>
        <button onClick={handleNewClick} style={{ marginLeft: '10px' }}>New Book</button>
        <button onClick={handleSaveSnapshotClick} style={{ marginLeft: '10px' }}>Save Snapshot</button>
        <button onClick={handleLoadSnapshotClick} style={{ marginLeft: '10px' }}>Load Snapshot</button>
        <button onClick={handleGenGraphClick} style={{ marginLeft: '10px' }}>Gen Graph</button>
      </nav>
      {showGraph && <ConvertGraph />}
    </div>
  );
};

export default Body;
