import {useState} from 'react'
import Resizable from './resizable';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
const CodeCell = () => {
    const [ code, setCode ] = useState('')
    const [input, setInput] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    }


    return (
      <Resizable direction="vertical">   
        <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
          <Resizable direction="hirizontal">
            <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)}/>
          </Resizable>
          <Preview code={code}/>
        </div>
      </Resizable>
    )
}

export default CodeCell;