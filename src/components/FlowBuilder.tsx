import ReactFlow, {
  type Node,
  type NodeTypes,
  type OnSelectionChangeParams,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import useNodesStore from '../store/nodes';
import { TEXT_NODE_TYPE } from '../constants/constants';
import TextNode from './TextNode';
import { DragEvent, useCallback, useState } from 'react';

const nodeTypes: NodeTypes = {
  [TEXT_NODE_TYPE]: TextNode,
};

function FlowBuilder() {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const nodes = useNodesStore((state) => state.nodes);
  const edges = useNodesStore((state) => state.edges);

  const addNode = useNodesStore((state) => state.addNode);

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

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    // BUG: type does not recieve the value
    const type = event.dataTransfer.getData('data') || 'text';

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance!.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: Node = {
      id: '',
      type,
      position,
      data: { label: `${type} node` },
      selected: true,
    };

    addNode(newNode);
  };

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
        selectNodesOnDrag={false}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        deleteKeyCode={'Delete'}
      />
    </div>
  );
}

export default FlowBuilder;
