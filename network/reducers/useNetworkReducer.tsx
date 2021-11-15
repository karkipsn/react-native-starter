import { Reducer, useEffect, useReducer, useState } from "react";
import {
  ApiService,
  AxiosApi,
  NetworkAction,
  NetworkError,
  NetworkReducer,
  NetworkState,
} from "../types"; 


function useNetworkReducer<S = any, R = any>(
    api: ApiService<S>,
    onSucess?: (data: R, dataArray: Array<R>) => void,
    onError?: (error: NetworkError) => void
  ): NetworkReducer<S, R> {

    let reducer = makeResponseReducer<R>();

    const [params, setParams] = useState<Array<S | undefined>>();
    const [subscribed, isSubscribed] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, { isLoading: false })

    useEffect(() => {
        if (subscribed) {
          let didCancel = false;
    
          !didCancel && dispatch({ type: "PENDING" });
    
          const axiosApi: Array<AxiosApi> | undefined = params
            ? params.map((param) => api(param))
            : undefined;
    
          axiosApi && 
            (async () => {
              try {
                const response = await Promise.all(
                  axiosApi.map(({ call }) => call())
                ) 
                setTimeout(() => {
                  if (!didCancel &&  typeof response !== 'undefined' && response.length > 0) {
                    console.log(
                      "Api Response",
                      response.map(({ status, data, config }) => {
                        return { status, data, url: config.url };
                      })
                    );
                    console.log("DIDCANCEL1: ", didCancel);
                    const data = response[0].data
                      ? response[0].data === ""
                        ? { result: true }
                        : response[0].data
                      : { result: true };
                    const dataArray = response.map(({ data }) =>
                      data? data === "" ? { result: true } :data: { result: true }
                    );
                    dispatch({
                      type: "FULFILLED",
                      payload: { data, dataArray },
                    });
                    onSucess && onSucess(data, dataArray);
                    isSubscribed(false);
                    setParams(undefined);
                  }
                }, 2000);
              } catch (error) {
                setTimeout(() => {
                  if (!didCancel) {
                    console.log("Api Error", error);
                    console.log("DIDCANCEL: ", didCancel);
                    dispatch({ type: "REJECTED", payload: { error: error } });
                    onError && onError(error);
                    isSubscribed(false);
                    setParams(undefined);
                  }
                }, 1000);
              }
            })();
    
          return () => {
            didCancel = true;
            axiosApi?.map(({ abort }) => abort());
            console.log("ABORT MISSION: ", didCancel);
          };
        }
      }, [subscribed]);

    const subscribe = (params?: S | Array<S>) => {
        if (!subscribed) {
          params instanceof Array ? setParams(params) : setParams([params]);
            isSubscribed(true);
        }
    };

    const reset = () => {
        dispatch({type: "RESET"});

    };

    return [state, subscribe, reset];

  }


function makeResponseReducer<R>(): Reducer<NetworkState<R>, NetworkAction<R>>{

    const responseReducer = (
        state: NetworkState<R>,
        action: NetworkAction<R>
      ): NetworkState<R> => {
        switch (action.type) {
          case "PENDING":
            return { ...state, isLoading: true, error: undefined };
          case "FULFILLED":
            return {
              ...state,
              isLoading: false,
              data: action.payload?.data,
              dataArray: action.payload?.dataArray,
              error: undefined,
            };
          case "REJECTED":
            return {
              ...state,
              isLoading: false,
              error: action.payload?.error,
            };
          case "RESET":
            return { isLoading: false };
          default:
            return state;
        }
      };
      return responseReducer;
}

export default useNetworkReducer;

  