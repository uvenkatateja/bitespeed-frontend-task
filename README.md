# BiteSpeed Frontend Task: Chatbot Flow Builder

## Overview

A simple Chatbot flow builder implemented using React and React Flow. The application allows users to create chatbot flows by connecting multiple messages together to determine the order of execution.

## Live Demo
[Live Demo](https://your-deployment-url.vercel.app)

## Task Implementation

### 1. Text Node ✓
- Implemented text message nodes as the primary node type
- Support for multiple Text Nodes in a single flow
- Drag and drop functionality from Nodes Panel
- Clean message bubble design with edit capabilities

### 2. Nodes Panel ✓
- Houses all available node types
- Currently supports Text Message Node as required
- Implemented with extensible architecture for future node types
- Drag and drop interface for node creation

### 3. Edge Implementation ✓
- Successfully connects two nodes together
- Animated connection lines
- Visual indicators for flow direction
- Prevents invalid connections

### 4. Source Handle ✓
- Implemented as the origin point of connections
- Strictly enforces one outgoing connection per node
- Shows error message when attempting multiple connections
- Located on the right side of nodes

### 5. Target Handle ✓
- Implemented as the destination point for connections
- Supports multiple incoming connections as required
- Located on the left side of nodes
- Visual feedback for valid connection points

### 6. Settings Panel ✓
- Replaces Nodes Panel when a node is selected
- Provides text field for editing message content
- Real-time content updates
- Cancel and delete options

### 7. Save Button ✓
- Implements required validation logic
- Shows error when multiple nodes have empty target handles
- Saves valid flows to local storage
- Provides visual feedback for save status

## Technical Implementation

### Built With
- React (Next.js)
- [React Flow](https://reactflow.dev/)
- Tailwind CSS for styling
- React Icons for UI elements

### Project Structure
```
src/
├── components/
│   ├── edges/
│   │   └── CustomEdge.js        # Custom edge implementation
│   ├── handles/
│   │   └── CustomHandle.js      # Source and target handle implementation
│   ├── nodes/
│   │   └── TextMessageNode.js   # Text message node implementation
│   ├── FlowBuilder.js          # Main flow builder component
│   ├── Header.js               # Header with save button
│   ├── NodePanelSidebar.js    # Sidebar component
│   └── NodeSelector.js         # Node type selection panel
└── app/
    ├── layout.js
    └── page.js
```

### Key Features Implementation

1. **Node Connection Rules**
```javascript
// Enforcing single outgoing connection
if (sourceHasConnection) {
  setErrorMessage("A message can only have one outgoing connection");
  return;
}
```

2. **Save Validation**
```javascript
// Checking for nodes with empty target handles
if (nodesWithoutTargets.length > 1) {
  setErrorMessage("Only one message can be the starting point");
  return;
}
```

## Example Flow Structure
1. Start Node (No incoming connections)
   → Single outgoing connection to
2. Middle Node (Has both incoming and outgoing)
   → Single outgoing connection to
3. End Node (Only incoming connections)

## Getting Started

1. **Installation**
```bash
npm install
# or
yarn install
```

2. **Development**
```bash
npm run dev
# or
yarn dev
```

3. **Build**
```bash
npm run build
# or
yarn build
```

## Deployment

This project is deployed on Vercel. You can view the live demo [here](https://your-deployment-url.vercel.app).

## Additional Notes

- All code is thoroughly commented for clarity
- Implemented using JavaScript
- Built on top of React Flow with custom components
- Follows all task requirements strictly

## Repository

[GitHub Repository](https://github.com/your-username/bitespeed-frontend-task)
