import { BiCalendar } from 'react-icons/bi';
import CustomHandle from '../handles/CustomHandle';
import { Position } from 'reactflow';

export default function DatePickerNode({ data, selected, ...props }) {
  // Parse date configuration if available
  let dateConfig = { prompt: '', minDate: '', maxDate: '' };
  
  try {
    if (data.value && typeof data.value === 'string') {
      const parsed = JSON.parse(data.value);
      dateConfig = { ...dateConfig, ...parsed };
    }
  } catch (error) {
    console.error('Failed to parse date config:', error);
  }
  
  const hasConfig = dateConfig.prompt && dateConfig.prompt.trim().length > 0;
  
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
        <BiCalendar size={16} className="text-blue-500" />
        <p className="text-xs font-medium">Date Picker</p>
        <BiCalendar size={16} className="text-blue-500" />
      </div>

      {/* Content section with date configuration */}
      <div 
        className="p-3 py-4 relative cursor-pointer hover:bg-gray-50" 
        onClick={() => data.onClick()}
      >
        {hasConfig ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">{dateConfig.prompt}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              {dateConfig.minDate && (
                <p>From: {dateConfig.minDate}</p>
              )}
              {dateConfig.maxDate && (
                <p>To: {dateConfig.maxDate}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-center text-gray-400 flex flex-col items-center justify-center gap-2">
            <BiCalendar size={24} className="text-blue-500" />
            <span>Click to configure date picker</span>
          </div>
        )}
      </div>

      {/* Connection handles */}
      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
} 