import {combineReducers} from "redux";
import auth from "./auth";
import mail from "./mail";

export default combineReducers({
  auth,
  mail,
});
