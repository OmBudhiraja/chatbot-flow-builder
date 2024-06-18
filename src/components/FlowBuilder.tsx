import ReactFlow, { NodeTypes, OnSelectionChangeParams, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import useNodesStore from '../store/nodes';
import { MESSAGE_NODE_TYPE } from '../constants/constants';
import MessageNode from './MessageNode';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

const nodeTypes: NodeTypes = {
  [MESSAGE_NODE_TYPE]: MessageNode,
};

function FlowBuilder() {
  const nodes = useNodesStore(useShallow((state) => state.nodes));
  const edges = useNodesStore(useShallow((state) => state.edges));

  const onNodesChange = useNodesStore((state) => state.onNodesChange);
  const onEdgesChange = useNodesStore((state) => state.onEdgesChange);
  const onConnect = useNodesStore((state) => state.connectEdge);

  const setSelectedNode = useNodesStore((state) => state.setSelectedNode);

  const onSelectionChange = useCallback(
    (ele: OnSelectionChangeParams) => {
      setSelectedNode(ele.nodes[0] ?? null);
    },
    [setSelectedNode]
  );

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        selectionOnDrag={false}
        selectNodesOnDrag={false}
      />
    </div>
  );
}

function FlowBuilderWithProvider() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

export default FlowBuilderWithProvider;
