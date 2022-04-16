import { Fragment } from 'react';
import { useTpedSelector } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
const CellList: React.FC = () => {
  const cells = useTpedSelector(({cells}) => {
    if(cells!.order) {
      return cells!.order.map((id) => cells!.data[id])
    }
  })

  const renderedCells = cells?.map((cell) => {
    return <Fragment key={cell.id}>
    <CellListItem key={cell.id} cell={cell} />
    <AddCell  previousCellId={cell.id}/>
    </Fragment>
});

  return <div>
    <div className={cells!.length === 0 ? 'force-visible' : ''}>
      <AddCell previousCellId={null}/>
    </div>
    {renderedCells}
    </div>
}

export default CellList;