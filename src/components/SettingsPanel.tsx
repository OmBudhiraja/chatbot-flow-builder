import { useEffect, useState } from 'react';
import { IoMdArrowBack as BackIcon } from 'react-icons/io';
import useNodesStore from '../store/nodes';
import { useStoreApi } from 'reactflow';

function SettingsPanel() {
  const selectedNode = useNodesStore((state) => state.nodes).find((node) => node.selected);
  const updateNodelabel = useNodesStore((state) => state.updateNodelabel);

  const [nodeLabel, setNodeLabel] = useState(selectedNode?.data.label ?? '');

  const flowInternalStore = useStoreApi();

  useEffect(() => {
    if (!selectedNode) {
      return;
    }

    updateNodelabel(selectedNode.id, nodeLabel);
  }, [nodeLabel, setNodeLabel, updateNodelabel, selectedNode]);

  if (!selectedNode) {
    return null;
  }
  return (
    <div className="">
      <div className="relative flex justify-center py-3 border-b-2 border-t-2 border-gray-200">
        <button
          className="absolute top-1/2 -translate-y-1/2 left-5"
          onClick={() => {
            flowInternalStore.getState().resetSelectedElements();
          }}
        >
          <BackIcon size={16} />
        </button>
        <p className="capitalize">Message</p>
      </div>
      <div className="px-5 py-6 flex flex-col gap-3">
        <p className="text-gray-500">Text</p>
        <textarea
          autoFocus
          className="w-full p-3 border-2 rounded-md border-gray-200 outline-gray-500"
          value={nodeLabel}
          onChange={(e) => {
            setNodeLabel(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
