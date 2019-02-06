import {convertToHashmap} from "../../common/utils";

const authState = convertToHashmap([
  "LOGGING_IN",
  "AUTHENTICATED",
  "NOT_AUTHENTICATED",
  "ERROR",
]);
const authActionType = convertToHashmap([
  "LOGIN_TRY",
  "LOGIN_OK",
  "LOGOUT_ERROR",
  "LOGOUT",
]);
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
