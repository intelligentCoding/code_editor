import {useEffect} from 'react'
import Resizable from './resizable';
import CodeEditor from './code-editor';
import Preview from './preview';
import { Cell } from '../state';
import {useActions} from '../hooks/use-actions';
import { useTpedSelector } from '../hooks/use-typed-selector';
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTpedSelector((state) => state.bundles![cell.id]);
    console.log(bundle);
    useEffect(() => {
      const timer = setTimeout(async () => {
        createBundle(cell.id, cell.content)
      }, 1000)
      return () => {
        clearTimeout(timer);
      }
    }, [cell.content, cell.id, createBundle])

    return (
      <Resizable direction="vertical">   
        <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
          <Resizable direction="hirizontal">
            <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
          </Resizable>
          {bundle && <Preview code={bundle.code} err={bundle.err}/> }
        </div>
      </Resizable>
    )
}

export default CodeCell;