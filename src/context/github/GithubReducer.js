export const githubReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,  
      };

    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export const githubReducerInitialState = {
  users: [],
  isLoading: false,
};
