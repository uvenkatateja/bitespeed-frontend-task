import { BiImages } from 'react-icons/bi';
import Image from 'next/image';
import CustomHandle from '../handles/CustomHandle';
import { Position } from 'reactflow';

/**
 * ImageMessageNode Component
 * 
 * Represents an image message node in the chatbot flow
 * This component renders an image message bubble with source and target handles
 * for connecting to other nodes.
 * 
 * @param {Object} data - Node data containing the image URL
 * @param {Function} data.onClick - Function to call when the node is clicked for editing
 * @param {string} data.value - The image URL or placeholder text
 */
export default function ImageMessageNode({ data, selected, ...props }) {
  // Determine if the node has an image URL
  const hasImage = data.value && data.value.startsWith('http');
  
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
        <BiImages size={16} className="text-blue-500" />
        <p className="text-xs font-medium">Image Message</p>
        <BiImages size={16} className="text-blue-500" />
      </div>

      {/* Content section with image preview */}
      <div 
        className="p-3 py-4 relative cursor-pointer hover:bg-gray-50" 
        onClick={() => data.onClick()}
      >
        {hasImage ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-32">
              <Image 
                src={data.value} 
                alt="Message image"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-md border border-gray-200"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 truncate w-full text-center">
              {data.value.split('/').pop()}
            </p>
          </div>
        ) : (
          <div className="text-sm text-center text-gray-400 flex flex-col items-center justify-center gap-2">
            <BiImages size={24} className="text-blue-500" />
            <span>Click to add image URL</span>
          </div>
        )}
      </div>

      {/* Connection handles */}
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
} 