const authState = {
  LOGGING_IN: 0,
  AUTHENTICATED: 1,
  NOT_AUTHENTICATED: 2,
  ERROR: 3,
};
const authActionType = {
  LOGIN_TRY: 0,
  LOGIN_OK: 1,
  LOGOUT_ERROR: 2,
  LOGOUT: 3,
};
const defaultUser = {
  id: "",
  name: "",
  designation: "",
  role: "",
};
const defaultAuth = {
  digest: null,
  user: defaultUser,
  state: authState.NOT_AUTHENTICATED,
};

export default function auth(state = defaultAuth, action) {
  switch (action.type) {
    case authActionType.LOGIN_TRY:
      return {
        digest: action.digest,
        user: defaultUser,
        state: authState.LOGGING_IN,
      };
    case authActionType.LOGIN_OK:
      return {...state, user: action.user, state: authState.AUTHENTICATED};
    case authActionType.LOGOUT_ERROR:
      return {...defaultAuth, state: authState.ERROR};
    case authActionType.LOGOUT:
      return defaultAuth;
    default:
      return state;
  }
}

export {defaultUser, authState, authActionType};
