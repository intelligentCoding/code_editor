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
    return <>
    <AddCell  nextCellId={cell.id}/>
    <CellListItem key={cell.id} cell={cell} />
    </>
})

  return <div>
    {renderedCells}
    <AddCell nextCellId={null}/>
    </div>
}

export default CellList;