import { createStore, combineReducers, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import appReducer from "./appReducer";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "supercprv2",
  storage: AsyncStorage
};

const reducer = combineReducers({ app: appReducer });

//Log out Redux actions when in debug mode
const logger = store => next => action => {
  // eslint-disable-next-line
  if (__DEV__) {
    console.log("DISPATCH:", action);
    console.log("NEXT STATE:", store.getState());
    return next(action);
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create an array of middleware to be applied by Redux
const middles = [logger];

// Apply middleware to Redux and generate the active store
export const store = createStore(persistedReducer, applyMiddleware(...middles));

export const persistor = persistStore(store);
