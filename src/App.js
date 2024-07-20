// App.js
import React from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import ThreeColumnLayout from './ThreeColumnLayout';
import { ChapterProvider } from './ChapterContext';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <ChapterProvider>
        <ThreeColumnLayout />
      </ChapterProvider>
      <Footer />
    </div>
  );
}

export default App;