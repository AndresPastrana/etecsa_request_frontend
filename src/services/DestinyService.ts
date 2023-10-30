import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { DestinyFormData, IDestiny, ServerResponse } from "../types";

// Required Bearer token
const urlbase = getURL(["SERVER", "PATH_DESTINY"]);

const createNewDestiny = async (
  destiny: Omit<DestinyFormData, "id">,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}${getURL(["DESTINY_CREATE"])}`;

    const res = await axios.post<ServerResponse & { data: IDestiny }>(
      url,
      destiny,
      { ...options }
    );

    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.log(error);
    throw new Error("Error while trying to insert a new destiny");
  }
};

const updateDestiny = async (
  destiny: DestinyFormData,
  options: AxiosRequestConfig
) => {
  try {
    const { id, ...blob } = destiny;
    const url = `${urlbase}/${id}`;
    const res = await axios.put<ServerResponse & { data: IDestiny }>(
      url,
      blob,
      { ...options }
    );
    return res.data.success ? res.data.data : null;
  } catch (error) {
    throw new Error("Error while trying to udapte a destiny");
  }
};

const getAllDestinies = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${getURL(["DESTINY_ALL"])}`;
    console.log(url);

    const resp = await axios.get<ServerResponse & { data: Array<IDestiny> }>(
      url,
      { ...options }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error(`Error while getting all destinies ,${error}`);
  }
};

// Id required
const getDestinyById = async (
  destinyId: string,
  options: AxiosRequestConfig
) => {
  const url = `${urlbase}/${destinyId}`;
  const resp = await axios.get(url, { ...options });
  const { data = null } = resp.data;
  return data;
};
// Id required
const deleteDestinyById = async (
  destinyId: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${destinyId}`;
    const res = await axios.delete<ServerResponse & { data: IDestiny }>(url, {
      ...options,
    });
    return res.data.success ? res.data.data : null;
  } catch (error) {
    console.error(error);

    throw new Error("Error while triying to delete a destiny");
  }
};

export const DestinyService = {
  createNewDestiny,
  getAllDestinies,
  getDestinyById,
  deleteDestinyById,
  updateDestiny,
};
