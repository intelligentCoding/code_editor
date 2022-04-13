import { ActionType } from "../actions-types";
import { CellTypes } from '../cell';
interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: CellTypes;

  }
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string,
    type: CellTypes;
  }
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
}

export type Action = MoveCellAction | DeleteCellAction | InsertCellBeforeAction | UpdateCellAction;
