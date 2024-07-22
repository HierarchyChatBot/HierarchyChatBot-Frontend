// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Body from './Body';
import Footer from './Footer';
import ThreeColumnLayout from './ThreeColumnLayout';
import { ChapterProvider } from './ChapterContext';
import Editor from './Editor/Editor';

function App() {
  return (
    <Router>
      <div className="App">
        <Body />
        <Routes>
          <Route path="/" element={
            <>
              <ChapterProvider>
                <ThreeColumnLayout />
              </ChapterProvider>
            </>
          } />
          <Route path="/editor" element={<Editor />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
