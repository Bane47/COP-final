import { createStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, counterSlice);

// Use persistedReducer as the root reducer
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
