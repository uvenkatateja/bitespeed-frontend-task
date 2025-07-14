'use client';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactFlow, {
  Background,
  Controls,
  Position,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

import NodePanelSidebar from './NodePanelSidebar';
import Header from './Header';
import { nodeTypes, edgeTypes } from './flowTypes';

// UUID generator for node IDs
const generateUniqueId = () => `node_${Math.random().toString(36).substr(2, 9)}`;

export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Connect nodes when an edge is created
   * Only allows one edge per source handle and prevents self-connections
   */
  const onConnect = useCallback(
    params => {
      setErrorMessage(null);

      // Prevent connecting a node to itself
      if (params.source === params.target) {
        setErrorMessage("Cannot connect a node to itself");
        return;
      }

      // Check if source already has a connection
      const sourceHasConnection = edges.some(edge => edge.source === params.source);
      if (sourceHasConnection) {
        setErrorMessage("A message can only have one outgoing connection");
        return;
      }

      // Add the custom edge with animation
      setEdges(eds => addEdge({
        ...params,
        type: 'custom-edge',
        animated: true,
        style: { stroke: '#94a3b8' }
      }, eds));
    },
    [edges, setEdges],
  );

  /**
   * Handle drag over event for node dropping
   */
  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle node click to select it for editing
   */
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setErrorMessage(null);
  }, []);

  /**
   * Handle drop event for creating new nodes
   */
  const onDrop = useCallback(
    event => {
      event.preventDefault();
      setErrorMessage(null);

      // Get node type from dataTransfer
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get mouse position in flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node with unique ID
      const nodeId = generateUniqueId();
      const newNode = {
        id: nodeId,
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          value: '',
          onClick: () => onNodeClick(null, {id: nodeId})
        },
      };
      
      setNodes(nds => nds.concat(newNode));
    },
    [reactFlowInstance, onNodeClick, setNodes],
  );

  /**
   * Update the selected node's value
   */
  const updateSelectedNode = useCallback(value => {
    if (!selectedNode) return;

    setNodes(nodes =>
      nodes.map(node => {
        if (node.id === selectedNode.id) {
          // Create a new data object to ensure React detects the change
          node.data = {
            ...node.data,
            value
          };
        }
        return node;
      }),
    );
  }, [selectedNode, setNodes]);

  /**
   * Delete the selected node and its connected edges
   */
  const deleteSelectedNode = useCallback(() => {
    if (!selectedNode) return;

    // Delete the node
    setNodes(nodes => nodes.filter(node => node.id !== selectedNode.id));
    
    // Delete any edges connected to this node
    setEdges(edges => edges.filter(
      edge => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    
    // Clear the selection
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges]);

  /**
   * Save flow to local storage
   */
  const saveFlowToLocal = useCallback(() => {
    localStorage.setItem('flow', JSON.stringify({nodes, edges}));
    setShowSaveAnimation(true);
  }, [nodes, edges]);

  /**
   * Clear all nodes and edges from the flow
   */
  const clearFlow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setShowConfirmClear(false);
    localStorage.removeItem('flow'); // Clear the flow data from localStorage
  }, [setNodes, setEdges]);

  /**
   * Validate the flow before saving
   */
  const validateFlow = useCallback(() => {
    setErrorMessage(null);
    
    // If there are no nodes, nothing to validate
    if (nodes.length === 0) {
      saveFlowToLocal();
      return;
    }
    
    // If there's only one node, it's valid
    if (nodes.length === 1) {
      saveFlowToLocal();
      return;
    }

    // For multiple nodes, check target handles
    const nodesWithoutTargets = nodes.filter(node => {
      // Find edges where this node is a target
      const isTarget = edges.some(edge => edge.target === node.id);
      return !isTarget;
    });

    // If more than one node has no incoming connections, show error
    if (nodesWithoutTargets.length > 1) {
      setErrorMessage("Only one message can be the starting point. Connect your messages to create a flow.");
      return;
    }

    // All validations passed, save the flow
    saveFlowToLocal();
  }, [nodes, edges, saveFlowToLocal]);

  // Handle save animation
  useEffect(() => {
    let timeout;
    if (showSaveAnimation) {
      timeout = setTimeout(() => {
        setShowSaveAnimation(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showSaveAnimation]);

  // Check if we're on mobile and hide sidebar by default
  useEffect(() => {
    const checkMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (mobileView) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Load flow from local storage on page load
   */
  useEffect(() => {
    try {
      const flow = localStorage.getItem('flow');
      if (flow) {
        const {nodes, edges} = JSON.parse(flow);
        setNodes(nodes || []);
        setEdges(edges || []);
      }
    } catch (error) {
      console.error('Error loading flow from local storage:', error);
    }
    
  }, [setNodes, setEdges]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Delete selected node with Delete key
      if (event.key === 'Delete' && selectedNode) {
        deleteSelectedNode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode, deleteSelectedNode]);

  // Toggle sidebar visibility
  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  return (
    <div className="flex flex-col h-screen">
      <Header 
        onClickSave={validateFlow} 
        showSaveAnimation={showSaveAnimation} 
        errorMessage={errorMessage}
        onClickClear={() => setShowConfirmClear(true)}
      />

      <div className="flex flex-row flex-grow h-full relative">
        <ReactFlowProvider>
          {/* Sidebar toggle button for mobile */}
          <button 
            className="md:hidden absolute top-2 left-2 z-10 bg-white p-2 rounded-full shadow-md"
            onClick={toggleSidebar}
          >
            {showSidebar ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
          </button>

          {/* Sidebar (Node Panel or Editor) - Now on the left */}
          <div 
            className={`${
              showSidebar ? 'translate-x-0' : '-translate-x-full'
            } transform transition-transform duration-300 ease-in-out md:translate-x-0 fixed md:static left-0 top-16 bottom-0 z-20 bg-white md:max-w-xs w-64 border-r overflow-y-auto`}
          >
            <NodePanelSidebar
              selectedNode={selectedNode}
              cancelSelection={() => setSelectedNode(null)}
              updateSelectedNode={value => updateSelectedNode(value)}
              deleteSelectedNode={deleteSelectedNode}
            />
          </div>

          {/* Flow builder canvas - Now on the right */}
          <div className="reactflow-wrapper flex-grow h-full" ref={reactFlowWrapper}>
            <ReactFlow
              fitView
              nodes={nodes}
              edges={edges}
              onInit={setReactFlowInstance}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={() => setSelectedNode(null)}
              onEdgeClick={() => setSelectedNode(null)}>
              <Background />
              <Controls />
              
              {/* Delete button panel */}
              {selectedNode && (
                <Panel position="top-right" className="bg-white p-2 rounded shadow-md">
                  <button
                    onClick={deleteSelectedNode}
                    className="flex items-center px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Node
                  </button>
                </Panel>
              )}
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      
      {/* Overlay when sidebar is open on mobile */}
      {showSidebar && isMobile && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      {/* Error message display */}
      {errorMessage && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{errorMessage}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setErrorMessage(null)}
          >
            &times;
          </span>
        </div>
      )}

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Clear Flow</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to clear all nodes and connections? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={clearFlow}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
