import { type Edge } from 'reactflow';
import useNodesStore from '../store/nodes';
import toast from 'react-hot-toast';

function Header() {
  const nodes = useNodesStore((state) => state.nodes);
  const edges = useNodesStore((state) => state.edges);

  function saveChangesHandler() {
    if (nodes.length > 1) {
      const edgesMap = new Map<string, Edge>();

      for (const edge of edges) {
        edgesMap.set(edge.target, edge);
      }

      const nodesWithNoTargetHandlers = nodes.filter((node) => !edgesMap.has(node.id));

      if (nodesWithNoTargetHandlers.length > 1) {
        toast.error('Cannot Save Flow');
        return;
      }
    }

    toast.success('Changes saved successfully');
  }

  return (
    <div className="bg-gray-100 py-3 px-10 flex justify-end">
      <button
        onClick={saveChangesHandler}
        className="bg-white border-2 border-violet-500 text-violet-500 font-semibold px-8 py-1.5 rounded-md"
      >
        Save Changes
      </button>
    </div>
  );
}

export default Header;
