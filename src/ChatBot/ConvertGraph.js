// ConvertGraph.js

import React, { useEffect } from 'react';
import { useHistory } from '../HistoryHandler';

const ConvertGraph = () => {
  const { promptMap } = useHistory();  // Access promptMap directly

  // Log all prompts from the promptMap
  const logAllPrompts = () => {
    if (promptMap && promptMap.size > 0) {
      promptMap.forEach((prompt, key) => {
        console.log(`Key: ${key}`);
        console.log(`Prompt: ${prompt}`);
      });
    } else {
      console.log('No prompts available.');
    }
  };

  useEffect(() => {
    // Call the function to log prompts when the component is rendered
    logAllPrompts();
  }, [promptMap]);

  return (
    <div>
      <h2>Prompt Logs</h2>
      <p>Check your console for all prompts!</p>
    </div>
  );
};

export default ConvertGraph;