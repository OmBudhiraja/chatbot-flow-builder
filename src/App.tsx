import { ReactFlowProvider } from 'reactflow';
import FlowBuilder from './components/FlowBuilder';
import Header from './components/Header';

import SidebarPanel from './components/SidebarPanel';

function App() {
  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <FlowBuilder />
          <SidebarPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
