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
      case "CLEAR_USERS":
        return {
          ...state,
          users: []
        }  
      default:
        return state;
    }
  };


  export const githubReducerInitialState = {
    users: [],
    isLoading: false,
  }