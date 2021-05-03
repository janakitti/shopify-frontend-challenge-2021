import React, { useReducer, createContext } from "react";
import Header from "../../components/Header/Header";
import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { IMovieMeta } from "../../shared/interfaces";

export interface INominationState {
  nominations: IMovieMeta[];
}

const INITIAL_NOMINATION_STATE: INominationState = {
  nominations: [],
};

export enum NominationReducerActions {
  ADD_MOVIE = "ADD_MOVIE",
  REMOVE_MOVIE = "REMOVE_MOVIE",
}

export type TNominationAction =
  | { type: NominationReducerActions.ADD_MOVIE; payload: { movie: IMovieMeta } }
  | { type: NominationReducerActions.REMOVE_MOVIE; payload: { id: string } };

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

const HomePage = () => {
  const [nominations, dispatchNominations] = useReducer(
    nominationReducer,
    INITIAL_NOMINATION_STATE
  );

  return (
    <NominationsContext.Provider value={{ nominations, dispatchNominations }}>
      <div className="home-wrapper">
        <div className="home-wrapper__body">
          <SearchCol />
          <NominationsCol />
        </div>
      </div>
    </NominationsContext.Provider>
  );
};

export default HomePage;
