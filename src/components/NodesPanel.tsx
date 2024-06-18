import { type DragEvent, HTMLAttributes } from 'react';
import { MESSAGE_NODE_TYPE, NODE_TYPES } from '../constants/constants';
import { BsChatText as MessageIcon } from 'react-icons/bs';

const NODES: Record<string, (props: HTMLAttributes<HTMLDivElement>) => React.JSX.Element> = {
  [MESSAGE_NODE_TYPE]: MessageNode,
};

function NodesPanel() {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.clearData();
    event.dataTransfer.setData('data', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="px-5 py-5 grid grid-cols-2 gap-5">
      {NODE_TYPES.map((type) => {
        const NodeComponent = NODES[type];
        return <NodeComponent draggable onDrag={(e) => onDragStart(e, type)} />;
      })}
    </div>
  );
}

function MessageNode(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="flex flex-col gap-2 items-center justify-center py-3 px-5 cursor-pointer text-violet-500 border-2 border-violet-500 rounded-lg font-semibold select-none"
    >
      <MessageIcon size={20} />
      <p>Message</p>
    </div>
  );
}

export default NodesPanel;
