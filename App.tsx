import React from 'react';
import {Provider} from "react-redux"
import Navigation from './navigation';
import { StatusBar } from 'expo-status-bar';
import useColorScheme from './hooks/useColorScheme';
import AxiosNetworkSetUp from "./network/axiosSetUp/AxiosNetworkSetUp";
import useCachedResources from './hooks/useCachedResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// For redux store set up without toolkit using plaing redux

// import thunk from "redux-thunk";
// import reducer from "./store/reducer"
// import { createStore, 
//   applyMiddleware, 
//   Store } from "redux";

// import { ArticleAction, 
//   ArticleState, 
//   DispatchType} from "./actionTypes"

  // Redux store with toollkit and local async storage function.
import { ReduxProvider } from "./store/toolkit"

// const store: Store<ArticleState, ArticleAction> & {
//   dispatch: DispatchType
// } = createStore(reducer, applyMiddleware(thunk))

export default function App() {

  // Want to check if the resources required are loaded prior to the rendering of the application.
  // Here checking the dowload of fonts from the cachable hook and using the SplashScreen fromm the expo.
  
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
   else {
    return (
      <SafeAreaProvider>
        {/* <Provider store = {store}> */}
        <ReduxProvider>
          <AxiosNetworkSetUp/>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ReduxProvider>
        {/* </Provider> */}
      </SafeAreaProvider>
    );
  }
}
