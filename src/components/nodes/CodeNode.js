import { BiCodeAlt } from 'react-icons/bi';
import CustomHandle from '../handles/CustomHandle';
import { Position } from 'reactflow';

export default function CodeNode({ data, selected, ...props }) {
  const hasCode = data.value && data.value.trim().length > 0;
  
  return (
    <div 
      className={`flex-col border min-w-72 bg-white rounded-lg shadow-sm transition-all ${
        selected ? 'border-blue-500 shadow-md' : 'border-gray-200'
      }`}
    >
      {/* Header section with icons and title */}
      <div className={`flex justify-between p-2 border-b ${
        selected ? 'bg-blue-50' : 'bg-gray-50'
      }`}>
        <BiCodeAlt size={16} className="text-blue-500" />
        <p className="text-xs font-medium">Code Block</p>
        <BiCodeAlt size={16} className="text-blue-500" />
      </div>

      {/* Content section with code preview */}
      <div 
        className="p-3 py-4 relative cursor-pointer hover:bg-gray-50" 
        onClick={() => data.onClick()}
      >
        {hasCode ? (
          <div className="bg-gray-800 rounded-md p-2 text-left overflow-hidden">
            <pre className="text-xs text-gray-200 whitespace-pre-wrap break-all max-h-32 overflow-y-auto">
              {data.value}
            </pre>
          </div>
        ) : (
          <div className="text-sm text-center text-gray-400 flex flex-col items-center justify-center gap-2">
            <BiCodeAlt size={24} className="text-blue-500" />
            <span>Click to add code</span>
          </div>
        )}
      </div>

      {/* Connection handles */}
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
} 