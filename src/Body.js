// Body.js

import React, { useRef, useState } from 'react';  // Import useState
import { Link } from 'react-router-dom';
import { useChapter } from './JsonState';
import { useHistory } from './HistoryHandler';
import { useConvertGraph } from './ConvertGraph';
import { useExport } from './ChatBot/Export';
import ConfigWindow from './ConfigWindow';  // Import ConfigWindow

const Body = () => {
  const { loadChaptersFromFile, saveChaptersToFile, resetChapters, mode } = useChapter();
  const { saveHistoryToJson, loadHistoryFromJson, resetHistories } = useHistory();
  const [ExportReport] = useExport();

  const fileInputRef = useRef(null);
  const chatFileInputRef = useRef(null);
  const generateGraph = useConvertGraph();

  // State for showing the ConfigWindow
  const [showConfig, setShowConfig] = useState(false);  // Manage state for config window

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

  const handleGenGraphClick = () => {
    generateGraph();
  };

  // Toggle export modal
  const handleExportClick = () => {
    ExportReport();
  };

  // Toggle config modal
  const handleConfig = () => {
    setShowConfig(true);  // Show the ConfigWindow when this is called
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

        {/* Conditionally render buttons based on mode */}
        {mode === 'Workflow' ? (
          <button onClick={handleGenGraphClick} style={{ marginLeft: '10px' }}>Gen Graph</button>
        ) : (
          <button onClick={handleExportClick} style={{ marginLeft: '10px' }}>Export Report</button>
        )}

        <button onClick={handleLoadSnapshotClick} style={{ marginLeft: '10px' }}>Load Snapshot</button>

        {/* Config button */}
        <button onClick={handleConfig} style={{ marginLeft: '10px' }}>Config</button>

        {/* Conditionally render the ConfigWindow */}
        {showConfig && <ConfigWindow onClose={() => setShowConfig(false)} />}
      </nav>
    </div>
  );
};

export default Body;
