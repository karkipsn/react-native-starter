import { ErrorHandler, NetworkError } from "../types";

const DefaultErrorHandler: ErrorHandler = {
    
  httpError: async (errorResponse, originalRequest) => {
    console.log("HTTP ERROR: ", errorResponse);
    const { message, title, action } = errorResponse.data;
    const networkError: NetworkError = {
      kind: "HTTP",
      message: message ?? title ?? "HTTP ERROR"
    };
    return Promise.reject(networkError);
  },

  networkError: (error) => {
    console.log("NETWORK ERROR: ", error.config);
    const networkError: NetworkError = {
      kind: "NETWORK",
      message:
        "We are unable to communicate with server. Please make sure you are connected to the internet and try again.",
    };
    return Promise.reject(networkError);
  },

  unexpectedError: (error) => {
    console.log("UNEXPECTED ERROR: ", error);
    const networkError: NetworkError = {
      kind: error.kind ?? "UNEXPECTED",
      message:
        error.kind === "HTTP" || error.kind === "NETWORK"
          ? error.message
          : "Some unexpected error occured."
    };
    return Promise.reject(networkError);
  },
};

export default DefaultErrorHandler;