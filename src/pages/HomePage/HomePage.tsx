import React, {
  useReducer,
  createContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Toast, Frame } from "@shopify/polaris";
import Header from "../../components/Header/Header";
import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { IMovieMeta } from "../../shared/interfaces";
import { NOMINATION_NUMBER } from "../../shared/constants";

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

const HomePage = () => {
  const [nominations, dispatchNominations] = useReducer(
    nominationReducer,
    INITIAL_NOMINATION_STATE
  );

  useEffect(() => {
    if (nominations.nominations.length === NOMINATION_NUMBER) {
      toggleIsToastActive();
    }
  }, [nominations]);

  const [isToastActive, setIsToastActive] = useState(false);
  const toggleIsToastActive = useCallback(
    () => setIsToastActive((active) => !active),
    []
  );
  const toastMarkup = isToastActive ? (
    <Toast content="Nominations complete 🎉" onDismiss={toggleIsToastActive} />
  ) : null;

  return (
    <NominationsContext.Provider value={{ nominations, dispatchNominations }}>
      <Frame>
        <div className="home-wrapper">
          <div className="home-wrapper__body">
            <SearchCol />
            <NominationsCol />
          </div>
        </div>
        {toastMarkup}
      </Frame>
    </NominationsContext.Provider>
  );
};

export default HomePage;
