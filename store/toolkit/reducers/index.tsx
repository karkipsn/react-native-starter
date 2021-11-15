import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { articleReducer }  from "../slices/articleSlice";

// Root reducer combining all the reducers

const rootreducer = persistCombineReducers(
    {
        key: "root",
        storage: AsyncStorage,
        whitelist: ["articles"],
      },
      {
        articles: articleReducer
        /**
         * Add other reducers with the slice name. For convinence use it as a reducer.
         */
      }
);

export default rootreducer;


