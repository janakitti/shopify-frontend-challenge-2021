import { useReducer, createContext } from "react";
import { IMovieMeta } from "./shared/interfaces";

export interface IUserState {
  nominations: IMovieMeta[];
}

const INITIAL_USER_STATE: IUserState = {
  nominations: [],
};

export enum UserReducerActions {
  ADD_MOVIE = "ADD_MOVIE",
  REMOVE_MOVIE = "REMOVE_MOVIE",
  CLEAR_MOVIES = "CLEAR_MOVIES",
}

export type TUserAction =
  | { type: UserReducerActions.ADD_MOVIE; payload: { movie: IMovieMeta } }
  | { type: UserReducerActions.REMOVE_MOVIE; payload: { id: string } }
  | { type: UserReducerActions.CLEAR_MOVIES };

const userReducer = (state: IUserState, action: TUserAction): IUserState => {
  switch (action.type) {
    case UserReducerActions.ADD_MOVIE:
      return {
        nominations: [...state.nominations, action.payload.movie],
      };
    case UserReducerActions.REMOVE_MOVIE:
      return {
        nominations: state.nominations.filter(
          (m: IMovieMeta) => m.imdbID !== action.payload.id
        ),
      };
    case UserReducerActions.CLEAR_MOVIES:
      return {
        nominations: [],
      };
    default:
      return state;
  }
};

export const UserContext = createContext<{
  user: IUserState;
  dispatchUser: React.Dispatch<TUserAction>;
}>({
  user: INITIAL_USER_STATE,
  dispatchUser: () => null,
});

interface IAppContextProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: IAppContextProps) => {
  const [user, dispatchUser] = useReducer(userReducer, INITIAL_USER_STATE);
  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppProvider;
