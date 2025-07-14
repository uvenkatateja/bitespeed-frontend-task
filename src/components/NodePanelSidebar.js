'use client';

import React from 'react';
import NodeSelector from './NodeSelector';
import TextNodeEditor from './editors/TextNodeEditor';
import ImageNodeEditor from './editors/ImageNodeEditor';
import CodeNodeEditor from './editors/CodeNodeEditor';
import DatePickerNodeEditor from './editors/DatePickerNodeEditor';

/**
 * NodePanelSidebar Component
 * 
 * Displays either the node selector or the appropriate editor based on the selected node
 * This component is designed to be extensible for future node types
 * 
 * @param {Object} selectedNode - The currently selected node
 * @param {Function} updateSelectedNode - Function to update the selected node
 * @param {Function} cancelSelection - Function to cancel the selection
 * @param {Function} deleteSelectedNode - Function to delete the selected node
 */
export default function NodePanelSidebar({ 
  selectedNode, 
  updateSelectedNode, 
  cancelSelection,
  deleteSelectedNode 
}) {
  /**
   * Render the appropriate editor based on the node type
   * This pattern makes it easy to add new node types in the future
   */
  const renderEditor = () => {
    if (!selectedNode) return null;
    
    // Select the appropriate editor based on node type
    switch (selectedNode.type) {
      case 'text':
        return (
          <TextNodeEditor
            cancelSelection={cancelSelection}
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'image':
        return (
          <ImageNodeEditor
            cancelSelection={cancelSelection}
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'code':
        return (
          <CodeNodeEditor
            cancelSelection={cancelSelection}
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'date':
        return (
          <DatePickerNodeEditor
            cancelSelection={cancelSelection}
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            deleteNode={deleteSelectedNode}
          />
        );
      default:
        // Fallback for unknown node types
        return (
          <div className="p-4">
            <p>No editor available for node type: {selectedNode.type}</p>
            <div className="mt-4 flex gap-2">
              <button 
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                onClick={cancelSelection}
              >
                Back to Node Panel
              </button>
              <button 
                className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                onClick={deleteSelectedNode}
              >
                Delete Node
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {selectedNode ? (
        renderEditor()
      ) : (
        <div className="p-4">
          <NodeSelector />
        </div>
      )}
    </div>
  );
}
