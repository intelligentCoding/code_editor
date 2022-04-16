import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from '../state';

export const useTpedSelector: TypedUseSelectorHook<RootState> = useSelector;