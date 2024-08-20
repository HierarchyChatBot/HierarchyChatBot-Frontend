// ConvertGraph.js
import { useHistory } from '../HistoryHandler';
import { useCallback } from 'react';

// Function to process promptMap data
const processPrompts = (promptMap) => {
  if (promptMap && promptMap.size > 0) {
    promptMap.forEach((prompt, key) => {
      console.log(`Key: ${key}`);
      console.log(`Prompt: ${prompt}`);
    });
  } else {
    console.log('No prompts available.');
  }
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  return useCallback(() => {
    processPrompts(promptMap);
  }, [promptMap]);
};
