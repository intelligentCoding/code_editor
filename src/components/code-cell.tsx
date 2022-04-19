import './code-cell.css';
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
    const cumulativeCode = useTpedSelector((state) => {
      const { data, order } = state.cells!;
      const orderedCells = order.map(id => data[id]);
      const cumulativeCode = [];
      for (let c of orderedCells) {
        if(c.type === 'code') {
          cumulativeCode.push(c.content);
        }
        if (c.id === cell.id) {
          break;
        }
      }
      console.log(cumulativeCode);
      return cumulativeCode;

    })
    useEffect(() => {
      if(!bundle) {
        createBundle(cell.id,  cumulativeCode.join('\n'));
        return;
      }
      const timer = setTimeout(async () => {
        createBundle(cell.id,  cumulativeCode.join('\n'))
      }, 1000)
      return () => {
        clearTimeout(timer);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ cell.id, createBundle, cumulativeCode.join('\n')])

    return (
      <Resizable direction="vertical">   
        <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
          <Resizable direction="hirizontal">
            <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)}/>
          </Resizable>
          <div className="progress-wrapper">
            {!bundle || bundle.loading ? <div className="progress-cover">
              <progress className="progerss is-small is-primary" max="100">
                Loading
              </progress>
            </div> : <Preview code={bundle.code} err={bundle.err}/> }
          </div>
          </div>
      </Resizable>
    )
}

export default CodeCell;