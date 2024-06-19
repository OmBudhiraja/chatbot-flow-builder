import { Ref, forwardRef } from 'react';
import { useDrag } from 'react-dnd';
import { BsChatText as MessageIcon } from 'react-icons/bs';
import { TEXT_NODE_TYPE, NODE_TYPES, ALLOWEDDROP } from '../constants/constants';

const CreateTextNode = forwardRef((_, ref: Ref<HTMLDivElement>) => {
  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 items-center justify-center py-3 px-5 cursor-pointer text-violet-500 border-2 border-violet-500 rounded-lg font-semibold select-none"
    >
      <MessageIcon size={20} />
      <p>Message</p>
    </div>
  );
});

const NODES: Record<
  string,
  React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>
> = {
  [TEXT_NODE_TYPE]: CreateTextNode,
};

function NodesPanel() {
  return (
    <div className="px-5 py-5 grid grid-cols-2 gap-5">
      {NODE_TYPES.map((type) => {
        return <NodeRender key={type} type={type} />;
      })}
    </div>
  );
}

function NodeRender({ type }: { type: string }) {
  const [_, drag] = useDrag(
    () => ({
      type: ALLOWEDDROP,
      item: { type },
    }),

    [type]
  );

  const NodeComponent = NODES[type];
  return <NodeComponent ref={drag} />;
}

export default NodesPanel;
