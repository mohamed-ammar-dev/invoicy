import axios from "axios";
import { getRequest } from "./types/getRequest";
import { postRequest } from "./types/postRequest";

class NetworkingRest {
  async get(params: getRequest) {
    const response = await axios({
      url: params.url,
      headers: params.headers,
      method: "get",
    });

    return await response.data;
  }

  async post(params: postRequest) {
    const body = params.body;
    const headers = params.headers;
    const url = params.url;

    const response = await axios({
      url,
      method: "post",
      data: body,
      headers,
    });

    return await response.data;
  }
}

export default new NetworkingRest();
