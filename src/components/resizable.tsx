import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState} from 'react';
import './resizable.css';
interface ResizableProps{
  direction: 'hirizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
  let resizeAbleProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  // debouncing
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout (() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        // for responsiveness 
        if(window.innerWidth * 0.75 < width){
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width])
  if(direction=== 'hirizontal') {
    resizeAbleProps = {
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      className: 'resize-horizontal',
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    };
  } else {
    resizeAbleProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.8],
      minConstraints: [Infinity, 100],
    }
  }
  return <ResizableBox {...resizeAbleProps}>
      {children}
    </ResizableBox>
}

export default Resizable;
