// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './Body';
import Footer from './Footer';
import ThreeColumnLayout from './ChatBot/ChatLayout';
import { ChapterProvider } from './JsonContext';
import Editor from './Editor/EditorLayout';

function App() {
  return (
    <ChapterProvider>
      <Router>
        <div className="App">
          <Body />
          <Routes>
            <Route path="/" element={<ThreeColumnLayout />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ChapterProvider>
  );
}

export default App;
