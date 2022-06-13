export const githubReducer = (state, action) => {
    switch (action.type) {
      case "GET_USERS":
        return {
          ...state,
          isLoading: true,
        };
      case "SET_USERS":
        return {
          ...state,
          users: action.payload,
          isLoading: false,
        };
      case "NOT_LOADING":
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
  };


  export const githubReducerInitialState = {
    users: [],
    isLoading: false,
  }