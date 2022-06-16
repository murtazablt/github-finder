import React, { useState, useContext, useReducer } from "react";
import { GithubContext } from "../../context/github/GithubContext";

const UserSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const { users, searchUsers, clearUsers } = useContext(GithubContext);

  const searchInputHandler = (e) => setSearchInput(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    if (searchInput === "") {
      //throw an error
      alert("Please enter a username!");
    }
    //get the users
    searchUsers(searchInput);

    //clear the search input
    setSearchInput("");
  };

  const clearHandler = () => {
    clearUsers();
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
          <button onClick={clearHandler} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
