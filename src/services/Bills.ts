import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { IBilling, ServerResponse } from "../types";

const urlbase = getURL(["SERVER", "PATH_BILLS"]);

const GetAllBills = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}${getURL(["BILLS_GET_ALL"])}`;
    const resp = await axios.get<ServerResponse & { data: Array<""> }>(url, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while loading bills");
  }
};

const GetAllBillsByDepartament = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${getURL(["BILLS_GET_BYDEPARTAMENT"])}`;
    const resp = await axios.get<ServerResponse & { data: Array<IBilling> }>(
      url,
      {
        ...options,
      }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while loading bills");
  }
};

export const BillService = {
  GetAllBills,
  GetAllBillsByDepartament,
};
