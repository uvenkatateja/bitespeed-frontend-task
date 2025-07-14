import { BezierEdge, EdgeLabelRenderer } from 'reactflow';
import { FaCaretRight } from 'react-icons/fa';

/**
 * CustomEdge Component
 * 
 * A custom edge component for React Flow
 * Renders a bezier curve with an arrow at the target end
 * 
 * @param {Object} props - Edge properties from React Flow
 */
export default function CustomEdge(props) {
  const { 
    targetX, 
    targetY, 
    sourceX, 
    sourceY,
    selected,
    animated
  } = props;
  
  return (
    <>
      {/* The edge path */}
      <BezierEdge 
        {...props} 
        style={{ 
          strokeWidth: selected ? 2 : 1.5,
          stroke: selected ? '#3b82f6' : '#94a3b8',
          transition: 'all 0.2s ease'
        }}
        animated={true}
      />

      {/* Arrow at the target end */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`,
            pointerEvents: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <FaCaretRight
            size={16}
            className={`${selected ? 'text-blue-500' : 'text-gray-500'} drop-shadow-sm transition-colors`}
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
