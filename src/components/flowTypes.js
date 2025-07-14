import TextMessageNode from './nodes/TextMessageNode';
import ImageMessageNode from './nodes/ImageMessageNode';
import CodeNode from './nodes/CodeNode';
import DatePickerNode from './nodes/DatePickerNode';
import CustomEdge from './edges/CustomEdge';

/**
 * Node type registry
 * Register all node types here to make them available in the flow builder
 * When adding a new node type:
 * 1. Import the node component
 * 2. Add it to this object with the key matching the 'type' in NodeSelector.js
 */
export const nodeTypes = {
  text: TextMessageNode,
  image: ImageMessageNode,
  code: CodeNode,
  date: DatePickerNode,
};

/**
 * Edge type registry
 * Register all edge types here to make them available in the flow builder
 */
export const edgeTypes = {
  'custom-edge': CustomEdge,
}; 