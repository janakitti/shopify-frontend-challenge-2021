import { useReducer, createContext, ReactChildren } from "react";
import { IMovieMeta } from "./shared/interfaces";

export interface INominationState {
  nominations: IMovieMeta[];
}

const INITIAL_NOMINATION_STATE: INominationState = {
  nominations: [],
};

export enum NominationReducerActions {
  ADD_MOVIE = "ADD_MOVIE",
  REMOVE_MOVIE = "REMOVE_MOVIE",
  CLEAR_MOVIES = "CLEAR_MOVIES",
}

export type TNominationAction =
  | { type: NominationReducerActions.ADD_MOVIE; payload: { movie: IMovieMeta } }
  | { type: NominationReducerActions.REMOVE_MOVIE; payload: { id: string } }
  | { type: NominationReducerActions.CLEAR_MOVIES };

const nominationReducer = (
  state: INominationState,
  action: TNominationAction
): INominationState => {
  switch (action.type) {
    case NominationReducerActions.ADD_MOVIE:
      return {
        nominations: [...state.nominations, action.payload.movie],
      };
    case NominationReducerActions.REMOVE_MOVIE:
      return {
        nominations: state.nominations.filter(
          (m: IMovieMeta) => m.imdbID !== action.payload.id
        ),
      };
    case NominationReducerActions.CLEAR_MOVIES:
      return {
        nominations: [],
      };
    default:
      return state;
  }
};

export const NominationsContext = createContext<{
  nominations: INominationState;
  dispatchNominations: React.Dispatch<TNominationAction>;
}>({
  nominations: INITIAL_NOMINATION_STATE,
  dispatchNominations: () => null,
});

interface IAppContextProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppContextProps) => {
  const [nominations, dispatchNominations] = useReducer(
    nominationReducer,
    INITIAL_NOMINATION_STATE
  );
  return (
    <NominationsContext.Provider value={{ nominations, dispatchNominations }}>
      {children}
    </NominationsContext.Provider>
  );
};

export default AppProvider;
