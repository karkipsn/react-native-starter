import Axios, { AxiosRequestConfig } from "axios";
import DefaultErrorHandler from "./DefaultErrorHandler";
import { AxiosNetwork as AxiosNetworkType } from "../types";

/**
 * Implementation of Axios Network Interface
 */
const AxiosNetwork: AxiosNetworkType = {

  configureNetwork: (baseUrl, errorHandler = DefaultErrorHandler) => {

    /**
     * Setting up defaults configs 
     */

    Axios.defaults.baseURL = baseUrl;
    Axios.defaults.timeout = 20000;

    /**
     * Setting up request interceptors
     */
    Axios.interceptors.request.use(
      (request) => request
    )

    /**
     * Setting up response interceptors (response can be manipulated(errorHandling and response format) here).
     */
    Axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (originalRequest) originalRequest._retry = true;
        console.log("Error: ", error);

        if (error.status)
          console.log("Error Status", error.status);

        if (error.response)
          return await errorHandler.httpError(error.response, originalRequest);

        if (error.request) 
          return await errorHandler.networkError(error);

        return await errorHandler.unexpectedError(error);
      }
    );
  },

  /**
   * 
   * @param endpoint 
   * @param config 
   */
 
  createNetworkApi: (endpoint, config) => {
    const source = Axios.CancelToken.source();

    const axiosConfig: AxiosRequestConfig = {
      ...config,
      url: endpoint,
      cancelToken: source.token,
      headers: { ...config.headers },
    };

    /**
     * Using alias of axios.request(config) for api call and it returns axiosPromise
     */
    const call = () => Axios.request(axiosConfig);

    /**
     * For cancel of the request.
     */
    
    const abort = () => source.cancel();

    return { call, abort };
  },
};

export default AxiosNetwork;