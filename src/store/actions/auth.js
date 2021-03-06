import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from '../actionTypes'
import { addError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function updateCurrentUser(user){
  return {
    type: UPDATE_CURRENT_USER,
    user
  }
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export const authUser = (type, userData) => dispatch => {
  return apiCall("post", `/api/auth/${type}`, userData)
    .then(({ token, user }) => {
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err => dispatch(addError(err.message)));
}
