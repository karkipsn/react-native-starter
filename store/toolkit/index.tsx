import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { compose } from 'redux';
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  // For debugging purpose adding it as an compose enhancer.
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const store = createStore(reducer, composeEnhancers())


const configureAppStore = () => {

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
    // enhancers: composeEnhancers
  });

  const persistor = persistStore(store);
  return { store, persistor };
}

const { store, persistor } = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector = <T extends unknown = unknown>(
  selector: (state: RootState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T => useSelector<RootState, T>(selector, equalityFn);

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const ReduxProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};