import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { IState, ServerResponse } from "../types";
// Required Bearer token
const urlbase = getURL(["SERVER", "PATH_STATE"]);

//Public endpoint
const getStatesByprovinceId = async (options?: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}`;
    const resp = await axios.get<ServerResponse & { data: Array<IState> }>(
      url,
      {
        ...options,
      }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while loading states");
  }
};

export const StateService = {
  getStatesByprovinceId,
};
