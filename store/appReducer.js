import { combineReducers } from "redux";

const INITIAL_STATE = {
  medTimerSet: 3,
  shockTimerSet: 2,
  sound: "pew",
  log: []
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ app: appReducer });
