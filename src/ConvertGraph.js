// ConvertGraph.js

import { useHistory } from './HistoryHandler';
import { useCallback } from 'react';
import { useGraphManager } from './Graph/GraphManager';
import { processFlowData } from './Graph/JsonUtils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const baseNode = {
  pos_x: 0.0,
  pos_y: 0.0,
  width: 250.0,  // Fixed width for all nodes
  height: 400.0, // Fixed height for all nodes
  nexts: [],
  type: '',
  name: '',
  description: '',
  tool: '',
  true_next: null,
  false_next: null,
};

const processPrompts = (promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes, navigate) => { // Add navigate as parameter
  if (promptMap && promptMap.size > 0) {
    let xOffset = 300; // Offset for subsequent nodes (start node takes position 0)
    const newNodes = [];

    // Add the START node first, using baseNode template
    const startNode = {
      ...baseNode,    // Spread the baseNode properties
      uniq_id: nodeIdCounter.toString(), // Assign nodeIdCounter as the uniq_id
      type: 'START',
      name: 'START',
      nexts: [(nodeIdCounter + 1).toString()], // Connect to the first actual node
    };

    newNodes.push(startNode); // Add the start node to the nodes array
    nodeIdCounter += 1; // Increment nodeIdCounter after the START node

    // Convert promptMap to an array of sorted [key, prompt] pairs
    const sortedPrompts = Array.from(promptMap.entries())
      .map(([key, prompt]) => {
        const cleanedKey = key.replace(/[\[\]\s]/g, ''); // Remove brackets and spaces
        const [c, s] = cleanedKey.split(',').map(Number);
        return { key: [c, s], prompt, originalKey: key };
      })
      .filter(({ key: [c, s] }) => !isNaN(c) && !isNaN(s)) // Filter out invalid entries
      .sort((a, b) => {
        const [c1, s1] = a.key;
        const [c2, s2] = b.key;
        if (c1 !== c2) return c1 - c2;
        return s1 - s2;
      });

    // Process each sorted entry
    sortedPrompts.forEach(({ key, prompt, originalKey }) => {
      const [c, s] = key;

      const newNode = {
        ...baseNode, // Use the base node template
        uniq_id: nodeIdCounter.toString(), // Increment ID for each node
        pos_x: xOffset, // Adjust x position
        nexts: [(nodeIdCounter + 1).toString()], // Point to the next node
        type: 'STEP',
        name: originalKey,
        description: prompt,
      };

      newNodes.push(newNode);
      nodeIdCounter += 1; // Increment local counter
      xOffset += 300; // Increase x-offset by 300 for spacing
    });


    // Add the START node first, using baseNode template
    const SaveNode = {
      ...baseNode,    // Spread the baseNode properties
      uniq_id: nodeIdCounter.toString(), // Assign nodeIdCounter as the uniq_id
      pos_x: xOffset,
      type: 'STEP',
      name: 'Save to File',
      tool: "save_file",
      description:"save the content to file",
    };

    newNodes.push(SaveNode); // Add the start node to the nodes array
    xOffset += 300;

    // Add the START node first, using baseNode template
    const ToolNode = {
      ...baseNode,    // Spread the baseNode properties
      uniq_id: "tool", // Assign nodeIdCounter as the uniq_id
      pos_x: xOffset,
      type: 'TOOL',
      name: 'save_file',
      nexts: [(nodeIdCounter + 1).toString()], // Connect to the first actual node
      description:"import os\n\n@tool\ndef save_file(file_path: str, content: str) -> None:\n    \"\"\"\n    :function: save_file\n    :param file_path: Path to the file where the content will be saved\n    :param content: The content to be written to the file\n    :return: True if the file was saved successfully, False otherwise\n    \"\"\"\n    try:\n        with open(file_path, 'w', encoding='utf-8') as file:\n            file.write(content)\n    except Exception as e:\n        print(f\"An error occurred: {e}\")\n",
    };

    newNodes.push(ToolNode); // Add the start node to the nodes array

    // Prepare the final JSON structure
    const jsonData = {
      nodes: newNodes,
      node_counter: nodeIdCounter, // Update node counter to current value
    };

    // Process the JSON data directly
    processFlowData(jsonData, setEdges, setNodes, setNodeIdCounter);

    // Navigate to the graph route after processing
    navigate('/graph');
  } else {
    console.log('No prompts available.');
  }
};

// Custom hook to provide the processPrompts function
export const useConvertGraph = () => {
  const { promptMap } = useHistory();
  const { nodeIdCounter, setNodeIdCounter, setNodes, setEdges } = useGraphManager();
  const navigate = useNavigate(); // Use the useNavigate hook

  return useCallback(() => {
    processPrompts(promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes, navigate); // Pass navigate to processPrompts
  }, [promptMap, nodeIdCounter, setNodeIdCounter, setEdges, setNodes, navigate]);
};
