import { memo } from 'react';
import { Handle, type NodeProps, Position } from 'reactflow';
import { BsChatText as MessageIcon } from 'react-icons/bs';
import whatsappIcon from '../../assets/whatsappIcon.png';

function TextNode({ data, selected }: NodeProps) {
  return (
    <>
      <Handle type="target" position={Position.Left} style={{ height: '6px', width: '6px' }} />
      <div
        className={`w-72 rounded-lg shadow-lg overflow-hidden ${
          selected ? 'outline-2 outline outline-violet-500' : 'border-none'
        }`}
      >
        <section className="flex items-center justify-between bg-gray-300 py-2 px-4">
          <div className="flex items-center gap-2">
            <MessageIcon size={14} />
            <p className="text-sm"> Send Message</p>
          </div>
          <div>
            <img height={20} width={20} src={whatsappIcon} alt="whatsapp icon" />
          </div>
        </section>
        <section className="bg-white px-4 py-3 max-w-full overflow-x-hidden">
          <p className="break-words">{data.label}</p>
        </section>
      </div>
      <Handle type="source" position={Position.Right} style={{ height: '6px', width: '6px' }} />
    </>
  );
}

const MemoizedTextNode = memo(TextNode);

export default MemoizedTextNode;
