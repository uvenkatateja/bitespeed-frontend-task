import { Handle } from 'reactflow';

/**
 * CustomHandle Component
 * 
 * A custom handle component for React Flow nodes
 * Provides a visual indicator for connecting nodes
 * 
 * @param {string} type - The type of handle ('source' or 'target')
 * @param {string} position - The position of the handle (Position.Left, Position.Right, etc.)
 * @param {string} id - Optional ID for the handle
 */
export default function CustomHandle({ type, position, id }) {
  // Different styles for source and target handles
  const isSource = type === 'source';
  
  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={{
        width: 12,
        height: 12,
        background: isSource ? '#3b82f6' : '#ffffff',
        border: `2px solid ${isSource ? '#2563eb' : '#94a3b8'}`,
        borderRadius: '50%',
        cursor: 'crosshair',
        zIndex: 1,
        transition: 'all 0.2s ease',
      }}
      className="transition-all hover:scale-110 hover:shadow-md hover:border-blue-500 hover:bg-blue-50"
    />
  );
}
