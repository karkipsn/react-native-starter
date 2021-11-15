import {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Session,
  } from "axios";
  
  // Global declaration for Axis and mmerging the params in their props.
  declare module "axios" {
    export interface AxiosRequestConfig {
      useAuthenticaiton?: boolean;
    }
  
    export interface AxiosInstance {
      session?: Session;
    }
  
    export interface Session {
      accessToken: string;
      refreshToken: string;
    }
  }

  
  // Interface for Api with call and abort callbacks/handlers or functions.
  // Two things in this service as it retrns Promise of any type(success, error) from the call function as well as void from the abort function
  export interface AxiosApi {
    call: () => AxiosPromise<any>;
    abort: () => void;
  }

  // Creating ApiService with generic type params and return type of AxiosApi Interface.
  export type ApiService<S> = (params?: S) => AxiosApi;

  // Defined 3 kinds of Error with message and array a
  export interface NetworkError {
    readonly kind: "HTTP" | "NETWORK" | "UNHANDLED";
    readonly message: string;
    readonly errors?: any;
  }
  
  export type NetworkState<R> = {
    isLoading: boolean;
    data?: R;
    dataArray?: Array<R>;
    error?: NetworkError;
  }

  export type NetworkAction<R> = {
    type: string;
    payload?: {
      data?: R;
      dataArray?: Array<R>;
      error?: NetworkError;
    };
  };

  // Since I am going to use a reducer and simplyfying the things.
  // Reducer will take 2 params as reducer and init state and returns the state as well as
  //  dispatch function.
  // In this case state, dispatch function with the s type params and the void reset function.

  export type NetworkReducer<S, R> = [
      NetworkState<R>,
      (params?: S | Array<S>) => void,
      () => void
  ];

  export interface AxiosNetwork {
    readonly configureNetwork: (
      baseUrl: string,
      errorHandler?: ErrorHandler
    ) => void;
    readonly createNetworkApi: (
      endpoint: string,
      config: AxiosRequestConfig
    ) => AxiosApi;
  }

// Handle the error from the interceptor middleware in the response.

export interface ErrorHandler {
    readonly httpError: (
      errorResponse: AxiosResponse,
      originalRequest: AxiosRequestConfig
    ) => Promise<NetworkError | AxiosResponse>;
    readonly networkError: (error: any) => Promise<NetworkError>;
    readonly unexpectedError: (error: any) => Promise<NetworkError>;
  }