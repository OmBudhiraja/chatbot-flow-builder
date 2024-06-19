import { ReactFlowProvider } from 'reactflow';
import FlowBuilder from './components/FlowBuilder';
import Header from './components/Header';

import SidebarPanel from './components/SidebarPanel';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactFlowProvider>
        <Toaster />
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex-1 flex">
            <FlowBuilder />
            <SidebarPanel />
          </div>
        </div>
      </ReactFlowProvider>
    </DndProvider>
  );
}

export default App;
