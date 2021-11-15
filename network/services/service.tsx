import { ApiService } from "../types"
import AxiosNetwork  from "../axiosSetUp/AxiosNetwork"
import {PostSP} from "../models/RequestSP"

export const postUser: ApiService<PostSP> = (params) => {

  console.log("PostParams", params);
    return AxiosNetwork.createNetworkApi("/posts", {
        method: "get",
      }
      );
};

export const getTestUser: ApiService<string> = (params) => {

  console.log("PostParams", params);
    return AxiosNetwork.createNetworkApi("", {
        method: "get",
        data: {
          name: params
        },
      }
     );
};

  

