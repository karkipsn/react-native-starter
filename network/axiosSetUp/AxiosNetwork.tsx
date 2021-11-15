import Axios, { AxiosRequestConfig } from "axios";
import DefaultErrorHandler from "./DefaultErrorHandler";
import { AxiosNetwork as AxiosNetworkType } from "../types";

const AxiosNetwork: AxiosNetworkType = {
  configureNetwork: (baseUrl, errorHandler = DefaultErrorHandler) => {

    Axios.defaults.baseURL = baseUrl;
    Axios.defaults.timeout = 20000;

    Axios.interceptors.request.use(
      (request) => request
    )

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

        if (error.request) return await errorHandler.networkError(error);

        return await errorHandler.unexpectedError(error);
      }
    );
  },
 
  createNetworkApi: (endpoint, config) => {
    const source = Axios.CancelToken.source();

    const axiosConfig: AxiosRequestConfig = {
      ...config,
      url: endpoint,
      cancelToken: source.token,
      headers: { ...config.headers },
    };

    const call = () => Axios.request(axiosConfig);
    
    const abort = () => source.cancel();

    return { call, abort };
  },
};

export default AxiosNetwork;