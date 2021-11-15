import React, { useEffect } from "react";
import  AxiosNetwork   from "./AxiosNetwork";
import constants from '../../constants/Constants'
import  DefaultErrorHandler   from "./DefaultErrorHandler";
import { ErrorHandler } from "../types";

const AxiosNetworkSetUp: React.FC = () => {

    let baseUrl = constants.baseUrl;
  
    const AppNetworkErrorHandler: ErrorHandler = {
      ...DefaultErrorHandler,
      httpError: async (errorResponse, originalRequest) => {
        console.log("HTTP ERROR: ", errorResponse);
        const { message, action, title, errors } = errorResponse.data;
  
        return Promise.reject({
          kind: "HTTP",
          message: message ?? title ?? "HTTP ERROR",
          errors,
          action,
        });
      },
    };

    useEffect(() => {
        AxiosNetwork.configureNetwork(baseUrl, AppNetworkErrorHandler);
      }, []);
      
    return <></>;
}

export default AxiosNetworkSetUp;