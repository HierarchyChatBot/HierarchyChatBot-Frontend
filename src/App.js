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
import { HistoryProvider } from './HistoryHandler';
import GraphApp from './Graph/GraphApp'; // Import the GraphApp
import { GraphManagerProvider } from './Graph/GraphManager'; // Import GraphManagerProvider

const ConditionalStrictMode = ({ children }) => {
  const location = useLocation();
  const useStrictMode = location.pathname !== '/editor';
  return useStrictMode ? <React.StrictMode>{children}</React.StrictMode> : <>{children}</>;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isGraphRoute = location.pathname === '/graph';

  if (isGraphRoute) {
    return children; // Render without Body and Footer
  }

  return (
    <>
      <Body />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ChapterProvider>
      <HistoryProvider>
        <GraphManagerProvider> {/* Wrap GraphManagerProvider around the Router */}
          <Router>
            <div className="App">
              <ConditionalStrictMode>
                <LayoutWrapper>
                  <Routes>
                    <Route path="/" element={<ChatLayout />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/graph" element={<GraphApp />} /> {/* Route for GraphApp */}
                  </Routes>
                </LayoutWrapper>
              </ConditionalStrictMode>
            </div>
          </Router>
        </GraphManagerProvider>
      </HistoryProvider>
    </ChapterProvider>
  );
}

export default App;
