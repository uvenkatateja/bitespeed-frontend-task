import { AiOutlineSave, AiOutlineWarning, AiOutlineClear } from 'react-icons/ai';
import { SiTicktick } from 'react-icons/si';

/**
 * Header Component
 * 
 * Displays the application header with a title and save button
 * Also shows error messages when validation fails
 * 
 * @param {Function} onClickSave - Function to call when the save button is clicked
 * @param {boolean} showSaveAnimation - Whether to show the save success animation
 * @param {string} errorMessage - Error message to display (if any)
 * @param {Function} onClickClear - Function to call when the clear button is clicked
 */
export default function Header({ onClickSave, showSaveAnimation, errorMessage, onClickClear }) {
  return (
    <header className="flex flex-row justify-between items-center px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-medium">Chatbot Flow Builder</h1>
        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          BiteSpeed Task
        </span>
      </div>

      <div className="flex items-center gap-4">
        {errorMessage && (
          <div className="flex items-center text-red-600 text-sm">
            <AiOutlineWarning size={16} className="mr-1" />
            <span>{errorMessage}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <button
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            onClick={onClickClear}
            title="Clear all nodes and connections"
          >
            <AiOutlineClear size={18} className="mr-2" />
            Clear All
          </button>
          
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all
              ${errorMessage 
                ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'}`}
            onClick={onClickSave}>
            Save Changes
            {showSaveAnimation ? (
              <SiTicktick size={18} className="ml-2" />
            ) : (
              <AiOutlineSave size={18} className="ml-2" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
