import React, { useReducer } from "react";

import { githubReducer, githubReducerInitialState } from "./GithubReducer";

const initialState = {
  users: [],
  isLoading: false,
  searchUsers: () => {},
  clearUsers: () => {},
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

  //Get search results
  const searchUsers = async (searchInput) => {
    //set isLoading to true
    dispatch({ type: "SET_LOADING" });

    const params = new URLSearchParams({
      q: searchInput,
    });

    try {
      const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        // headers: {
        //   Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        // },
      });

      const data = await res.json();
      const { items } = data;

      if (res.ok) {
        dispatch({ type: "SET_USERS", payload: items });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  return (
    <GithubContext.Provider
      value={{ users, isLoading, searchUsers, clearUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
