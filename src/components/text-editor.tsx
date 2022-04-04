import MDEditor from "@uiw/react-md-editor";
import './text-editor.css';
import { useState, useEffect, useRef  } from "react";
const TextEditor: React.FC = () => {
  const [value, setValue] = useState('# Header');

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  useEffect(()=> {
    const listener = (event: MouseEvent) => {
      // make sure the click was with in the text editing area. 
      if(ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      } 
      setEditing(false);
    }
    document.addEventListener('click', listener, { capture: true })
    return () => {
      document.removeEventListener('click', listener, {capture: true});
    }
  }, [])
  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || '') }/>
      </div>
    )
  }
  return <div className="text-editor" onClick={()=> setEditing(true)}>
    <MDEditor.Markdown source={value} />
  </div>
};

export default TextEditor;