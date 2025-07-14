import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BiMessageSquareDetail, BiTrash } from 'react-icons/bi';

/**
 * TextNodeEditor Component
 * 
 * Provides an interface for editing text message nodes
 * Allows users to modify the message content and see a preview
 * 
 * @param {Object} selectedNode - The currently selected node
 * @param {Function} updateSelectedNode - Function to update the node's value
 * @param {Function} cancelSelection - Function to cancel the selection and return to the node panel
 * @param {Function} deleteNode - Function to delete the current node
 */
export default function TextNodeEditor({ selectedNode, updateSelectedNode, cancelSelection, deleteNode }) {
  const [text, setText] = useState(selectedNode?.data?.value || '');
  
  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.value !== undefined) {
      setText(selectedNode.data.value);
    }
  }, [selectedNode]);
  
  // Handle text change and update the node
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateSelectedNode(newText);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="mb-4 flex justify-between items-center border-b p-4">
        <button 
          onClick={cancelSelection}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <IoIosArrowRoundBack size={24} className="mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-base font-medium flex items-center">
          <BiMessageSquareDetail className="mr-2" /> Message Settings
        </h1>

        <button
          onClick={deleteNode}
          className="flex items-center text-red-500 hover:text-red-700 transition-colors"
          title="Delete this node"
        >
          <BiTrash size={20} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="px-4 flex-1 flex flex-col">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Text
          </label>
          
          <textarea
            className="w-full p-3 bg-white border border-gray-300 rounded-lg font-medium min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Type your message here..."
            value={text}
            onChange={handleTextChange}
          />
          
          <p className="text-xs text-gray-500 mt-1">
            {text.length} characters
          </p>
        </div>
        
        {/* Message Preview */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {text ? (
              <p className="text-sm whitespace-pre-line">{text}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">No message content</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
