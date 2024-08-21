// ConvertGraph.js

import { useHistory } from './HistoryHandler';
import { useCallback } from 'react';
import { useGraphManager } from './Graph/GraphManagerContext';

// Function to process promptMap data
const processPrompts = (promptMap, nodeIdCounter, setNodeIdCounter) => {
  if (promptMap && promptMap.size > 0) {
    let xOffset = 0;
    const newNodes = [];
    let currentNodeIdCounter = nodeIdCounter; // Capture the initial value

    // Convert promptMap to an array of [key, prompt] pairs
    const sortedPrompts = Array.from(promptMap.entries())
      .map(([key, prompt]) => {
        const cleanedKey = key.replace(/[\[\]\s]/g, ''); // Remove brackets and spaces
        const [c, s] = cleanedKey.split(',').map(Number);
        return { key: [c, s], prompt, originalKey: key };
      })
      .sort((a, b) => {
        if (a.key[0] !== b.key[0]) return a.key[0] - b.key[0];
        return a.key[1] - b.key[1];
      });

    // Process each sorted entry
    sortedPrompts.forEach(({ key, prompt, originalKey }) => {
      const [c, s] = key;

      const newNode = {
        uniq_id: currentNodeIdCounter.toString(),
        pos_x: xOffset,
        pos_y: 0,
        width: 212,
        height: 212,
        nexts: [(currentNodeIdCounter + 1).toString()],
        type: 'STEP',
        name: originalKey,
        description: prompt,
        tool: "",
        true_next: null,
        false_next: null
      };

      newNodes.push(newNode);
      currentNodeIdCounter += 1; // Increment local counter

      xOffset += 250; // Increase x-offset by 250 to prevent overlap
    });

    // Prepare the final JSON structure
    const jsonData = {
      nodes: newNodes,
      node_counter: currentNodeIdCounter
    };

    // Save JSON to a file (for browser environment)
    saveToFile('temp.json', JSON.stringify(jsonData, null, 2));

    // Update nodeIdCounter state
    setNodeIdCounter(currentNodeIdCounter);
  } else {
    console.log('No prompts available.');
  }
};

// Function to trigger download of JSON data in browser
const saveToFile = (filename, data) => {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  const { nodeIdCounter, setNodeIdCounter } = useGraphManager();

  return useCallback(() => {
    processPrompts(promptMap, nodeIdCounter, setNodeIdCounter);
  }, [promptMap, nodeIdCounter, setNodeIdCounter]);
};
