import { memo } from 'react';
import { Handle, Position, NodeToolbar, NodeResizer } from '@xyflow/react';
 
const ResizableNode = ({ data }) => {
  return (
    <>
    <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};
 
export default memo(ResizableNode);