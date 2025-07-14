import { BiMessageSquareDetail, BiCalendar, BiCodeAlt, BiImages } from 'react-icons/bi';

/**
 * Node types configuration
 * This array defines all available node types in the flow builder
 */
const nodeTypes = [
  {
    type: 'text',
    value: 'Message',
    icon: BiMessageSquareDetail,
    disabled: false,
    description: 'Send a text message'
  },
  {
    type: 'image',
    value: 'Image Message',
    icon: BiImages,
    disabled: false,
    description: 'Send an image message'
  },
  {
    type: 'date',
    value: 'Date Picker',
    icon: BiCalendar,
    disabled: false,
    description: 'Ask user to select a date'
  },
  {
    type: 'code',
    value: 'Code Block',
    icon: BiCodeAlt,
    disabled: false,
    description: 'Execute custom code'
  }
];

export default function NodeSelector() {
  const onDragStart = (event, node) => {
    // Skip if node type is disabled
    if (node.disabled) {
      event.preventDefault();
      return;
    }
    
    // Set the node type as data for the drop event
    event.dataTransfer.setData('application/reactflow', node.type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <h1 className="text-lg font-medium mb-3">Message Types</h1>
      <p className="text-sm text-gray-500 mb-4">Drag and drop to add to your flow</p>

      <div className="grid grid-cols-2 gap-3">
        {nodeTypes.map(Node => (
          <div
            key={Node.type}
            onDragStart={event => onDragStart(event, Node)}
            draggable={!Node.disabled}
            className={`flex flex-col items-center justify-between p-4 my-2 bg-white border-2 rounded-lg font-medium transition-all active:scale-95 
              ${Node.disabled 
                ? 'border-gray-300 opacity-50 cursor-not-allowed' 
                : 'border-blue-500 cursor-grab hover:shadow-md'}`}>
            <div className="rounded-full mb-3">
              <Node.icon 
                size={24} 
                className={Node.disabled 
                  ? "text-gray-400" 
                  : "text-blue-500"} 
              />
            </div>

            <span className={`text-base select-none ${
              Node.disabled 
                ? "text-gray-400" 
                : "text-blue-500"
            }`}>
              {Node.value}
            </span>
            
            {Node.description && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                {Node.description}
              </p>
            )}
            
            {Node.disabled && (
              <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
