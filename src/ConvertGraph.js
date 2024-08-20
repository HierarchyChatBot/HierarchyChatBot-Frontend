// ConvertGraph.js
import { useHistory } from './HistoryHandler';
import { useCallback } from 'react';
import { useGraphManager } from './Graph/GraphManagerContext';

// Function to process promptMap data
const processPrompts = (promptMap, nodes, setNodes, nodeIdCounter, setNodeIdCounter) => {
  if (promptMap && promptMap.size > 0) {
    let xOffset = 0;
    const newNodes = [];

    promptMap.forEach((prompt, key) => {
      console.log(`Key: ${key}`);
      console.log(`Prompt: ${prompt}`);

      const newNode = {
        id: nodeIdCounter.toString(),
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
      setNodeIdCounter(prevCounter => prevCounter + 1);

      xOffset += 50; // Increase x-offset by 250 to prevent overlap
    });

    setNodes(prevNodes => [...prevNodes, ...newNodes]);
  } else {
    console.log('No prompts available.');
  }
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  const { nodes, setNodes, nodeIdCounter, setNodeIdCounter } = useGraphManager();

  return useCallback(() => {
    processPrompts(promptMap, nodes, setNodes, nodeIdCounter, setNodeIdCounter);
  }, [promptMap, nodes, setNodes, nodeIdCounter, setNodeIdCounter]);
};