import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';
interface ResizableProps{
  direction: 'hirizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
  let resizeAbleProps: ResizableBoxProps;
  if(direction=== 'hirizontal') {
    resizeAbleProps = {
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      minConstraints: [window.innerWidth * 0.2, Infinity],
      className: 'resize-horizontal',
    }
  } else {
    resizeAbleProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, window.innerHeight * 0.8],
      minConstraints: [Infinity, 100],
    }
  }
  return <ResizableBox {...resizeAbleProps}>
      {children}
    </ResizableBox>
}

export default Resizable;
