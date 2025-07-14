import { BiCode } from 'react-icons/bi';
import { Handle } from 'reactflow';

/**
 * CodeBlockNode Component
 * 
 * Represents a code block node in the flow
 * Displays code preview and handles connections
 */
export default function CodeBlockNode({ data, isConnectable }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[200px] shadow-sm">
      <div className="flex items-center mb-2">
        <BiCode className="text-blue-500 mr-2" size={20} />
        <span className="font-medium text-gray-700">Code Block</span>
      </div>
      
      {data.value ? (
        <pre className="bg-gray-50 p-2 rounded text-sm font-mono text-gray-600 whitespace-pre-wrap max-h-24 overflow-y-auto">
          {data.value}
        </pre>
      ) : (
        <p className="text-gray-400 text-sm">No code added yet</p>
      )}

      <Handle
        type="target"
        position="left"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="source"
        position="right"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
} 