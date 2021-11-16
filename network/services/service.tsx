import { ApiService } from "../types"
import AxiosNetwork  from "../axiosSetUp/AxiosNetwork"
import {PostSP} from "../models/RequestSP"

/**
 * Taking params as T class and returnind AxiosApi interface.
 * @param params T
 */

/**
 * 
 *  Requests can be made by passing the relevant config to axios.

axios(config)
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
 */
export const postUser: ApiService<PostSP> = (params) => {

  /**
   * Calling 
   */
  return AxiosNetwork.createNetworkApi("/posts", {
      method: "get",
    }
    );
};

export const voidUser: ApiService<PostSP> = () => {

  console.log("PostParams", "Void");
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

  

