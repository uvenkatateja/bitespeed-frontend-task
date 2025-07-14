import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BiCodeAlt, BiTrash } from 'react-icons/bi';

/**
 * CodeNodeEditor Component
 * 
 * Provides an interface for editing code nodes
 * Allows users to input code and see a preview
 * 
 * @param {Object} selectedNode - The currently selected node
 * @param {Function} updateSelectedNode - Function to update the node's value
 * @param {Function} cancelSelection - Function to cancel the selection and return to the node panel
 * @param {Function} deleteNode - Function to delete the current node
 */
export default function CodeNodeEditor({ selectedNode, updateSelectedNode, cancelSelection, deleteNode }) {
  const [code, setCode] = useState(selectedNode?.data?.value || '');
  
  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.value !== undefined) {
      setCode(selectedNode.data.value);
    }
  }, [selectedNode]);
  
  // Handle code change
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    updateSelectedNode(newCode);
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
          <BiCodeAlt className="mr-2" /> Code Editor
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
        <div className="mb-6 flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code
          </label>
          
          <textarea
            className="w-full h-64 p-3 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your code here..."
            value={code}
            onChange={handleCodeChange}
            style={{ fontFamily: 'monospace' }}
          />
          
          <p className="text-xs text-gray-500 mt-1">
            {code.length} characters
          </p>
        </div>
        
        {/* Code Preview */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          
          <div className="border border-gray-200 rounded-lg bg-gray-50">
            {code ? (
              <div className="bg-gray-800 rounded-md p-4 text-left overflow-hidden">
                <pre className="text-xs text-gray-200 whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
                  {code}
                </pre>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                <BiCodeAlt size={24} className="mx-auto mb-2" />
                <p>No code to preview</p>
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Note: This is a preview only. The code will not be executed in this editor.
          </p>
        </div>
      </div>
    </div>
  );
} 