import { useState, useEffect } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { BiImages, BiTrash } from 'react-icons/bi';
import Image from 'next/image';

/**
 * ImageNodeEditor Component
 * 
 * Provides an interface for editing image message nodes
 * Allows users to input an image URL and see a preview
 */
export default function ImageNodeEditor({ selectedNode, updateSelectedNode, cancelSelection, deleteNode }) {
  const [imageUrl, setImageUrl] = useState(selectedNode?.data?.value || '');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode?.data?.value !== undefined) {
      setImageUrl(selectedNode.data.value);
      setIsValidUrl(isValidImageUrl(selectedNode.data.value));
    }
  }, [selectedNode]);
  
  // Check if URL is valid image URL
  const isValidImageUrl = (url) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null || url.startsWith('http');
  };
  
  // Handle image URL change
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setIsValidUrl(isValidImageUrl(url));
    updateSelectedNode(url);
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
          <BiImages className="mr-2" /> Image Settings
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
      <div className="p-4">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          
          <input
            type="text"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          
          {!isValidUrl && imageUrl && (
            <p className="text-xs text-red-500 mt-1">
              Please enter a valid image URL
            </p>
          )}
        </div>
        
        {/* Image Preview */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center min-h-[200px]">
            {isLoading && (
              <div className="text-center text-gray-500">Loading...</div>
            )}
            
            {imageUrl && isValidUrl ? (
              <div className="relative w-full h-48">
                <Image 
                  src={imageUrl} 
                  alt="Preview"
                  fill
                  style={{ objectFit: 'contain' }}
                  onLoadingComplete={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setIsValidUrl(false);
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <BiImages size={48} className="mx-auto mb-2" />
                <p>No image to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 