import { combineReducers } from 'redux';
import cellsReducer from './cellsReducers';
import bundlesReducers  from './bundlesReducers';
const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;