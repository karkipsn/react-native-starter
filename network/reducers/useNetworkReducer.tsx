import { Reducer, useEffect, useReducer, useState } from "react";
import { ApiService, AxiosApi, NetworkAction, NetworkError, NetworkReducer, NetworkState, DispatchAction } from "../types"; 


function useNetworkReducer<S = any, R = any>(
    api: ApiService<S>,
    onSucess?: (data: R, dataArray: Array<R>) => void,
    onError?: (error: NetworkError) => void
  ): NetworkReducer<S, R> {

    /**
     *  export type NetworkReducer<S, R> = [
      NetworkState<R>,
      (params?: S | Array<S>) => void,
      () => void
  ];
     */

    let reducer = makeResponseReducer<R>();

    const [params, setParams] = useState<Array<S | undefined>>();
    const [subscribed, isSubscribed] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, { isLoading: false })

    const subscribe = (params?: S | Array<S>) => {
      if (!subscribed) {
        params instanceof Array ? setParams(params) : setParams([params]);
        console.log("Params:", params);
          isSubscribed(true);
      }
  };

    useEffect(() => {
        if (subscribed) {
          let didCancel = false;
    
          !didCancel && dispatch({ type: DispatchAction.PENDING });
    
          /**
           * Here params is taken and api call is dispatched using the instance of axios
           */
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
                      type: DispatchAction.FULFILLED,
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

                    dispatch({ 
                      type: DispatchAction.REJECTED, 
                      payload: { error: error } });

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

    

    const reset = () => {
        dispatch({type: DispatchAction.RESET});

    };

    return [state, subscribe, reset];

  }


function makeResponseReducer<R>(): Reducer<NetworkState<R>, NetworkAction<R>>{

    const responseReducer = (
        state: NetworkState<R>,
        action: NetworkAction<R>
      ): NetworkState<R> => {
        switch (action.type) {
          case DispatchAction.PENDING:
            return { ...state, isLoading: true, error: undefined };

          case DispatchAction.FULFILLED:
            return {
              ...state,
              isLoading: false,
              data: action.payload?.data,
              dataArray: action.payload?.dataArray,
              error: undefined,
            };

          case DispatchAction.REJECTED:
            return {
              ...state,
              isLoading: false,
              error: action.payload?.error,
            };

          case DispatchAction.RESET:
            return { isLoading: false };
          default:
            return state;
        }
      };
      return responseReducer;
}

export default useNetworkReducer;

  