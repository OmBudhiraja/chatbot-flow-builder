import { type DragEvent, type HTMLAttributes } from 'react';
import { TEXT_NODE_TYPE, NODE_TYPES } from '../constants/constants';
import { BsChatText as MessageIcon } from 'react-icons/bs';

const NODES: Record<string, (props: HTMLAttributes<HTMLDivElement>) => React.JSX.Element> = {
  [TEXT_NODE_TYPE]: CreateTextNode,
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
        return <NodeComponent key={type} draggable onDrag={(e) => onDragStart(e, type)} />;
      })}
    </div>
  );
}

function CreateTextNode(props: HTMLAttributes<HTMLDivElement>) {
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
