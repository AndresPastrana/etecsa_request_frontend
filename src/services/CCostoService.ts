import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { ICCosto, ServerResponse } from "../types";
const urlbase = getURL(["SERVER", "PATH_CCOSTO"]);

const GetCCostos = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}`;
    const resp = await axios.get<ServerResponse & { data: Array<ICCosto> }>(
      url,
      {
        ...options,
      }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while loading ccostos");
  }
};

export const CCostoService = {
  GetCCostos,
};
