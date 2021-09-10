export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        name: action.payload.name,
        token: action.payload.token,
        userId: action.payload.userId,
        login: true,
      };
    case "LOGOUT":
      return {
        ...state,
        name: "",
        token: null,
        login: false,
        userId: null,
      };
    default:
      return state;
  }
};
