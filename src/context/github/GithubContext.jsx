import React, { useReducer } from "react";

import { githubReducer, githubReducerInitialState } from "./GithubReducer";

const initialState = {
  users: [],
  isLoading: false,
  user: {},
  repos: [],
};

export const GithubContext = React.createContext(initialState);

const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    githubReducer,
    githubReducerInitialState
  );

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
