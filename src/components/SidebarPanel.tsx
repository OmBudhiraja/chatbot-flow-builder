import useNodesStore from '../store/nodes';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

function SidebarPanel() {
  const selectedNode = useNodesStore((state) => state.selectedNode);

  return (
    <aside className="w-96 border-l-2 border-gray-200">
      {selectedNode ? <SettingsPanel /> : <NodesPanel />}
    </aside>
  );
}

export default SidebarPanel;
