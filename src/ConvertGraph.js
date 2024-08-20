// ConvertGraph.js

import { useHistory } from './HistoryHandler';
import { useCallback } from 'react';
import { useGraphManager } from './Graph/GraphManagerContext';

// Function to process promptMap data
const processPrompts = (promptMap, setNodes, nodeIdCounter, setNodeIdCounter) => {
  if (promptMap && promptMap.size > 0) {
    let xOffset = 0;
    const newNodes = [];
    let currentNodeIdCounter = nodeIdCounter; // Capture the initial value

    promptMap.forEach((prompt, key) => {
      console.log(`Key: ${key}`);
      console.log(`Prompt: ${prompt}`);

      const newNode = {
        id: currentNodeIdCounter.toString(),
        type: 'textUpdater',
        data: { 
          name: key, 
          description: prompt, 
          type: 'STEP', 
          nexts: [], 
          true_next: null, 
          false_next: null, 
          width: 200, 
          height: 200 
        },
        position: { x: xOffset, y: 0 },
        prevs: []
      };

      newNodes.push(newNode);
      currentNodeIdCounter += 1; // Increment local counter

      xOffset += 250; // Increase x-offset by 50 to prevent overlap
    });

    // Update nodes state
    setNodes(prevNodes => [...prevNodes, ...newNodes]);

    // Update nodeIdCounter state
    setNodeIdCounter(currentNodeIdCounter);
  } else {
    console.log('No prompts available.');
  }
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  const { nodes, setNodes, nodeIdCounter, setNodeIdCounter } = useGraphManager();

  return useCallback(() => {
    processPrompts(promptMap, setNodes, nodeIdCounter, setNodeIdCounter);
  }, [promptMap, setNodes, nodeIdCounter, setNodeIdCounter]);
};
