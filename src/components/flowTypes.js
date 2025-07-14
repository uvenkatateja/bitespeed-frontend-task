import TextMessageNode from './nodes/TextMessageNode';
import ImageMessageNode from './nodes/ImageMessageNode';
import DatePickerNode from './nodes/DatePickerNode';
import CodeBlockNode from './nodes/CodeBlockNode';
import CustomEdge from './edges/CustomEdge';

// Node types configuration
export const nodeTypes = {
  text: TextMessageNode,
  image: ImageMessageNode,
  datePicker: DatePickerNode,
  codeBlock: CodeBlockNode,
};

// Edge types configuration
export const edgeTypes = {
  'custom-edge': CustomEdge,
}; 