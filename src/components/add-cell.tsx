import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;
}
const AddCell: React.FC<AddCellProps> = ({nextCellId}) => {
  const { insertCellAfter } = useActions();
  return <div className="add-cell">
    <div className="add-buttons">
      <button className="button is-rounded is-primary " onClick={() => insertCellAfter(nextCellId, 'code')}>
        <span className="icon ">
          <i className="fas fa-plus"/>
        </span>
        <span>code</span>
      </button>
      <button className="button is-rounded is-primary " onClick={() => insertCellAfter(nextCellId, 'text')}>
      <span className="icon ">
          <i className="fas fa-plus"/>
        </span>
        <span>Text</span>
      </button>
    </div>
    <div className="divider"></div>
    </div>
}

export default AddCell;