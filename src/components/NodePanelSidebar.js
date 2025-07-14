'use client';

import React from 'react';
import { BiMessageSquareDetail, BiImages, BiCalendar, BiCode } from 'react-icons/bi';
import TextNodeEditor from './editors/TextNodeEditor';
import ImageNodeEditor from './editors/ImageNodeEditor';
import DatePickerNodeEditor from './editors/DatePickerNodeEditor';
import CodeBlockEditor from './editors/CodeBlockEditor';

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
export default function NodePanelSidebar({ selectedNode, updateSelectedNode, cancelSelection, deleteSelectedNode }) {
  const nodeTypes = [
    {
      type: 'text',
      label: 'Message',
      description: 'Send a text message',
      icon: BiMessageSquareDetail,
    },
    {
      type: 'image',
      label: 'Image Message',
      description: 'Send an image message',
      icon: BiImages,
    },
    {
      type: 'datePicker',
      label: 'Date Picker',
      description: 'Ask user to select a date',
      icon: BiCalendar,
    },
    {
      type: 'codeBlock',
      label: 'Code Block',
      description: 'Execute custom code',
      icon: BiCode,
    },
  ];

  // Show appropriate editor when a node is selected
  if (selectedNode) {
    switch (selectedNode.type) {
      case 'text':
        return (
          <TextNodeEditor
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            cancelSelection={cancelSelection}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'image':
        return (
          <ImageNodeEditor
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            cancelSelection={cancelSelection}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'datePicker':
        return (
          <DatePickerNodeEditor
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            cancelSelection={cancelSelection}
            deleteNode={deleteSelectedNode}
          />
        );
      case 'codeBlock':
        return (
          <CodeBlockEditor
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
            cancelSelection={cancelSelection}
            deleteNode={deleteSelectedNode}
          />
        );
      default:
        return null;
    }
  }

  // Show node types panel when no node is selected
  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Message Types</h2>
        <p className="text-sm text-gray-500 mt-1">Drag and drop to add to your flow</p>
      </div>
      
      <div className="p-4 space-y-4">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md transition-all cursor-grab"
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', node.type);
              event.dataTransfer.effectAllowed = 'move';
            }}
            draggable
          >
            <node.icon className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">{node.label}</h3>
              <p className="text-sm text-gray-500">{node.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
