import { BiEdit, BiMessageSquareDetail } from 'react-icons/bi';
import CustomHandle from '../handles/CustomHandle';
import { Position } from 'reactflow';

/**
 * TextMessageNode Component
 * 
 * Represents a text message node in the chatbot flow
 * This component renders a message bubble with source and target handles
 * for connecting to other nodes.
 * 
 * @param {Object} data - Node data containing the message text
 * @param {Function} data.onClick - Function to call when the node is clicked for editing
 * @param {string} data.value - The message text content
 */
export default function TextMessageNode({ data, selected, ...props }) {
  // Determine if the node has content
  const hasContent = data.value && data.value.trim().length > 0;
  
  return (
    <div 
      className={`flex-col border min-w-[200px] w-full max-w-[280px] bg-white rounded-lg shadow-sm transition-all ${
        selected ? 'border-blue-500 shadow-md' : 'border-gray-200'
      }`}
    >
      {/* Header section with icons and title */}
      <div className={`flex justify-between p-2 border-b ${
        selected ? 'bg-blue-50' : 'bg-gray-50'
      }`}>
        <BiMessageSquareDetail size={16} className="text-blue-500" />
        <p className="text-xs font-medium">Message</p>
        <BiMessageSquareDetail size={16} className="text-blue-500" />
      </div>

      {/* Content section with message text */}
      <div 
        className={`p-3 py-4 relative ${hasContent ? '' : 'cursor-pointer hover:bg-gray-50'}`} 
        onClick={() => data.onClick()}
      >
        {hasContent ? (
          <div className="text-sm whitespace-pre-line break-words">
            {data.value}
          </div>
        ) : (
          <div className="text-sm text-center text-gray-400 flex items-center justify-center gap-2">
            <BiEdit size={16} />
            <span>Click to add message</span>
          </div>
        )}
        
        {/* Edit button that appears on hover when there's content */}
        {hasContent && (
          <div 
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 hover:opacity-100 cursor-pointer bg-white rounded-full p-1 shadow-sm hover:shadow"
            onClick={(e) => {
              e.stopPropagation();
              data.onClick();
            }}
          >
            <BiEdit size={16} className="text-blue-500" />
          </div>
        )}
      </div>

      {/* Connection handles */}
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
}
