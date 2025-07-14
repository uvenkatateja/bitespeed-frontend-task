import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BiCode, BiTrash } from 'react-icons/bi';

/**
 * CodeBlockEditor Component
 * 
 * Provides an interface for editing code block nodes
 * Allows users to input custom code
 */
export default function CodeBlockEditor({ selectedNode, updateSelectedNode, cancelSelection, deleteNode }) {
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
          <BiCode className="mr-2" /> Code Block Settings
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
      <div className="p-4 flex-grow">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code
          </label>
          
          <textarea
            className="w-full h-64 p-3 bg-white border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter your code here..."
            value={code}
            onChange={handleCodeChange}
          />
          
          <p className="text-xs text-gray-500 mt-1">
            Write custom code to be executed in this block
          </p>
        </div>
        
        {/* Preview */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {code ? (
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
                {code}
              </pre>
            ) : (
              <div className="text-center text-gray-400">
                <BiCode size={24} className="mx-auto mb-2" />
                <p>No code to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 