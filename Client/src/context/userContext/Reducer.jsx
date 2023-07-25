const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default Reducer;
