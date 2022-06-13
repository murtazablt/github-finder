import React, { useReducer } from "react";

import { githubReducer, githubReducerInitialState } from "./GithubReducer";

const initialState = {
  users: [],
  isLoading: false,
  getUsers: () => {},
};

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubContext = React.createContext(initialState);

const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    githubReducer,
    githubReducerInitialState
  );
  const { users, isLoading } = state;

  const fetchUsers = async () => {
    dispatch({ type: "GET_USERS" });

    try {
      const res = await fetch(`${GITHUB_URL}/users`, {
        // headers: {
        //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        // },
      });
      const data = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_USERS", payload: data });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "NOT_LOADING" });
  };

  return (
    <GithubContext.Provider value={{ users, isLoading, getUsers: fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
