import { useState, useEffect, useCallback } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BiCalendar, BiTrash } from 'react-icons/bi';

/**
 * DatePickerNodeEditor Component
 * 
 * Provides an interface for editing date picker nodes
 * Allows users to configure the date picker options
 * 
 * @param {Object} selectedNode - The currently selected node
 * @param {Function} updateSelectedNode - Function to update the node's value
 * @param {Function} cancelSelection - Function to cancel the selection and return to the node panel
 * @param {Function} deleteNode - Function to delete the current node
 */
export default function DatePickerNodeEditor({ selectedNode, updateSelectedNode, cancelSelection, deleteNode }) {
  // Parse existing configuration if available
  const parseConfig = useCallback((value) => {
    // Default date picker configuration moved inside useCallback
    const defaultConfig = { prompt: '', minDate: '', maxDate: '' };
    
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error('Failed to parse date config:', error);
      }
    }
    return defaultConfig;
  }, []); // No dependencies needed now
  
  const [config, setConfig] = useState(parseConfig(selectedNode?.data?.value));
  
  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.value !== undefined) {
      const config = parseConfig(selectedNode.data.value);
      setConfig(config);
    }
  }, [selectedNode, parseConfig]);
  
  // Handle configuration changes
  const handleConfigChange = (field, value) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
    updateSelectedNode(JSON.stringify(newConfig));
  };
  
  // Format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Try to parse the date
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      // Format as YYYY-MM-DD
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="mb-4 flex justify-between items-center border-b p-4">
        <button 
          onClick={cancelSelection}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <IoIosArrowRoundBack size={24} className="mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-base font-medium flex items-center">
          <BiCalendar className="mr-2" /> Date Picker Settings
        </h1>

        <button
          onClick={deleteNode}
          className="flex items-center text-red-500 hover:text-red-700 transition-colors"
          title="Delete this node"
        >
          <BiTrash size={20} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="px-4 flex-1 flex flex-col">
        {/* Prompt Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt Message
          </label>
          
          <input
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Please select a date"
            value={config.prompt || ''}
            onChange={(e) => handleConfigChange('prompt', e.target.value)}
          />
          
          <p className="text-xs text-gray-500 mt-1">
            The message that will be shown to the user
          </p>
        </div>
        
        {/* Date Range Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Min Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Date
            </label>
            
            <input
              type="date"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formatDateForInput(config.minDate)}
              onChange={(e) => handleConfigChange('minDate', e.target.value)}
            />
            
            <p className="text-xs text-gray-500 mt-1">
              The earliest date that can be selected
            </p>
          </div>
          
          {/* Max Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Date
            </label>
            
            <input
              type="date"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formatDateForInput(config.maxDate)}
              onChange={(e) => handleConfigChange('maxDate', e.target.value)}
            />
            
            <p className="text-xs text-gray-500 mt-1">
              The latest date that can be selected
            </p>
          </div>
        </div>
        
        {/* Preview */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {config.prompt ? (
              <div>
                <p className="text-sm font-medium mb-3">{config.prompt}</p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500">Min Date</span>
                    <span className="text-sm border rounded px-2 py-1 bg-white">
                      {config.minDate || 'None'}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500">Max Date</span>
                    <span className="text-sm border rounded px-2 py-1 bg-white">
                      {config.maxDate || 'None'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <BiCalendar size={24} className="mx-auto mb-2" />
                <p>Add a prompt message to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 