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

    // Convert promptMap to an array of [key, prompt] pairs
    const sortedPrompts = Array.from(promptMap.entries())
      // Remove brackets, spaces and parse keys into [c, s]
      .map(([key, prompt]) => {
        const cleanedKey = key.replace(/[\[\]\s]/g, ''); // Remove brackets and spaces
        const [c, s] = cleanedKey.split(',').map(Number);
        return { key: [c, s], prompt, originalKey: key };
      })
      // Sort by c, then by s
      .sort((a, b) => {
        if (a.key[0] !== b.key[0]) return a.key[0] - b.key[0];
        return a.key[1] - b.key[1];
      });

    // Process each sorted entry
    sortedPrompts.forEach(({ key, prompt, originalKey }) => {
      const [c, s] = key;
      console.log(`Key: ${originalKey}`);
      console.log(`Prompt: ${prompt}`);

      const newNode = {
        id: currentNodeIdCounter.toString(),
        type: 'textUpdater',
        data: { 
          name: originalKey, 
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

      xOffset += 250; // Increase x-offset by 250 to prevent overlap
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
