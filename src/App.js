// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import ThreeColumnLayout from './ThreeColumnLayout';
import { ChapterProvider } from './ChapterContext';
import Editor from './Editor';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <MainContent />
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
