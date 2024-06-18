import {
  Connection,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';
import { MESSAGE_NODE_TYPE } from '../constants/constants';

type State = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  test?: string;
};

type Actions = {
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  connectEdge: (edge: Edge | Connection) => void;
  setSelectedNode: (nodeId: Node | null) => void;
  updateNodelabel: (nodeId: string, label: string) => void;
  addNode: (node: Node) => void;
};

const initialState: State = {
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: MESSAGE_NODE_TYPE },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ],
  edges: [],
  selectedNode: null,
};

const useNodesStore = create<State & Actions>((set, get) => ({
  ...initialState,

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  connectEdge(edge) {
    // check if a edge with same source already exists
    const existingEdgeWithSameSource = get().edges.find((e) => e.source === edge.source);

    if (existingEdgeWithSameSource) {
      return;
    }

    // apply egde end markers
    (edge as Edge).markerEnd = {
      type: MarkerType.Arrow,
      height: 20,
      width: 20,
    };

    set({
      edges: addEdge(edge, get().edges),
    });
  },

  addNode(node) {
    node.id = (get().nodes.length + 1).toString();
    set({
      nodes: [...get().nodes, node],
    });
  },

  setSelectedNode(node: Node | null) {
    const prevNodeId = node ? node.id : get().selectedNode?.id;

    if (prevNodeId) {
      set({
        selectedNode: node,
        nodes: applyNodeChanges(
          [
            {
              id: prevNodeId,
              type: 'select',
              selected: !!node,
            },
          ],
          get().nodes
        ),
      });
    } else {
      set({ selectedNode: node });
    }
  },

  updateNodelabel(nodeId, label) {
    const node = get().nodes.find((n) => n.id === nodeId);

    if (!node) {
      return;
    }

    node.data = { ...node.data, label };

    set({
      nodes: [...get().nodes],
    });
  },
}));

export default useNodesStore;
