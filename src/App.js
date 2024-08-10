// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Body from './Body';
import Footer from './Footer';
import ChatLayout from './ChatBot/ChatLayout';
import { ChapterProvider } from './JsonState';
import Editor from './Editor/EditorLayout';
import Test from './Test/Test';
import { HistoryProvider } from './HistoryHandler'; // Import HistoryProvider

// Component to conditionally apply StrictMode
const ConditionalStrictMode = ({ children }) => {
  const location = useLocation();
  
  // Apply StrictMode to all routes except '/editor'
  const useStrictMode = location.pathname !== '/editor';

  return useStrictMode ? <React.StrictMode>{children}</React.StrictMode> : <>{children}</>;
};

function App() {
  return (
    <ChapterProvider>
      <HistoryProvider> {/* Wrap with HistoryProvider */}
        <Router>
          <div className="App">
            <Body />
            <ConditionalStrictMode>
              <Routes>
                <Route path="/" element={<ChatLayout />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/test" element={<Test />} /> {/* Add Test Route */}
              </Routes>
            </ConditionalStrictMode>
            <Footer />
          </div>
        </Router>
      </HistoryProvider>
    </ChapterProvider>
  );
}

export default App;
