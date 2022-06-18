import React, { useState, useContext } from "react";

import { GithubContext } from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

import { searchUsers } from "../../context/github/GithubActions";

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const searchInputHandler = (e) => setSearchInput(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (searchInput === "") {
      //throw an error
      setAlert("Please enter something!", "error");
    }
    //get the users
    dispatch({ type: "SET_LOADING" });

    const users = await searchUsers(searchInput);

    dispatch({ type: "SET_USERS", payload: users });
    dispatch({ type: "SET_LOADING" });

    //clear the search input
    setSearchInput("");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 ">
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <div className="relative">
              <input
                className="w-full pr-40 bg-gray-200 input input-lg text-black "
                type="text"
                placeholder="Search for a user"
                onChange={searchInputHandler}
                value={searchInput}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length !== 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className="btn btn-ghost btn-lg"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
