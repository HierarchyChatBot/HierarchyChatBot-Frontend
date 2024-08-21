// ConvertGraph.js

import { useHistory } from './HistoryHandler';
import { useCallback } from 'react';
import { useGraphManager } from './Graph/GraphManager';
import { processFlowData } from './Graph/JsonUtils';

// Function to process promptMap data
const processPrompts = (promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes) => {
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

    // Instead of saving to file, process the JSON data directly
    processFlowData(jsonData, setEdges, setNodes, setNodeIdCounter);
  } else {
    console.log('No prompts available.');
  }
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  const { nodeIdCounter, setNodeIdCounter, setNodes, setEdges} = useGraphManager();

  return useCallback(() => {
    processPrompts(promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes);
  }, [promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes]);
};
