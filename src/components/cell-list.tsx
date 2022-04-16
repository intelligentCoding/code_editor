import { useTpedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
const CellList: React.FC = () => {
  const cells = useTpedSelector(({cells}) => {
    if(cells!.order) {
      return cells!.order.map((id) => cells!.data[id])
    }
  })

  const renderedCells = cells?.map(cell => <CellListItem key={cell.id} cell={cell} />)

  return <div>{renderedCells}</div>
}

export default CellList;