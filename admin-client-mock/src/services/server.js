import axios from "axios";
import store from "./store";
import {authActionType} from "./reducers/auth";
import {loadMailbox} from "./mail";

// Initialise
const apiBase = ((b = "") => {
  const base = b.toLowerCase();
  if (base.indexOf("http") === 0) return base;
  return window.location.href
    .split("//")
    .map((segment, i) => (i === 1 ? segment.split("/")[0] : segment))
    .join("//")
    .concat("/")
    .concat(base);
})(window.apiBase);
const apiURL = api => `${apiBase}${api}`;

// Authentication
let digest = "";
const createDigest = (username, password) => {
  return new Buffer(username + ":" + password).toString("base64");
};
store.subscribe(() => {
  digest = store.getState().auth.digest;
});
const addDigest = (options = {}) => {
  const currentHeaders = options.headers || {};
  return {
    ...options,
    headers: {...currentHeaders, Authorization: "Basic " + digest},
  };
};
const login = (usernameOrDigest, password) => {
  let digest;
  if (!password) {
    digest = usernameOrDigest;
  } else {
    digest = createDigest(usernameOrDigest, password);
  }
  const {dispatch} = store;
  dispatch({type: authActionType.LOGIN_TRY, digest: digest});
  // Just to view the loader, login after 1 second
  setTimeout(() => {
    post("sessions", {})
      .then(res => {
        const user = res.data;
        saveSession(digest);
        dispatch({type: authActionType.LOGIN_OK, user: user});
        loadMailbox();
      })
      .catch(err => {
        clearSession();
        dispatch({type: authActionType.LOGOUT_ERROR});
      });
  }, 1000);
};
const logout = () => {
  const {dispatch} = store;
  clearSession();
  dispatch({type: authActionType.LOGOUT});
};

// Http calls
const get = (api, params, options, handlers) =>
  axios.get(apiURL(api), params, addDigest(options), handlers);
const post = (api, params, options, handlers) =>
  axios.post(apiURL(api), params, addDigest(options), handlers);
const deleteIt = (api, params, options, handlers) =>
  axios.delete(apiURL(api), params, addDigest(options), handlers);

// Local storage
const localStorageKey = "admin-client-mock-session";
const saveSession = digest => {
  localStorage.setItem(localStorageKey, digest);
};
const loadSession = () => localStorage.getItem(localStorageKey) || null;
const clearSession = () => localStorage.removeItem(localStorageKey);

// Check if digest exists in local storage
const oldDigest = loadSession();
if (typeof oldDigest === "string") {
  // Yes, login with this digest
  login(oldDigest);
}

export {get, post, deleteIt, createDigest, addDigest, login, logout};
