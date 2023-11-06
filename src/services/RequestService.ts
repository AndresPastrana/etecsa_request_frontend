import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import {
  IRequest,
  IResource,
  RequestCounter,
  RequestFormData,
  ServerResponse,
} from "../types";
import { RequestStatus } from "../const";

const baseUrl = getURL(["SERVER", "PATH_REQUEST"]);

const getAllRequests = async (
  options: AxiosRequestConfig
): Promise<Array<IRequest>> => {
  const url = `${baseUrl}`;
  const resp = await axios.get(url, { ...options });
  const { data = null } = resp.data;
  return data;
};

const createRequest = async (
  data: {
    destiny: string;
    resources: Array<Pick<IResource, "product" | "quantity">> | [];
  },
  options: AxiosRequestConfig
) => {
  try {
    const url = `${baseUrl}/create`;
    const resp = await axios.post<ServerResponse & { data: RequestFormData }>(
      url,
      data,
      { ...options }
    );

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while creating a new request");
  }
};

const approveRequest = async (id: string, options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}/aprove/${id}`;

    const resp = await axios.put<ServerResponse & { data: RequestFormData }>(
      url,
      null,
      {
        ...options,
      }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while aproving request");
  }
};

const denyRequest = async (id: string, options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}/denied/${id}`;
    const resp = await axios.put<ServerResponse & { data: RequestFormData }>(
      url,
      null,
      {
        ...options,
      }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while denied request");
  }
};

const getRequestCountsByStatus = async (
  options: AxiosRequestConfig,
  status?: RequestStatus | "all"
) => {
  try {
    const url = `${baseUrl}/request-counts?status=${status}`;
    const resp = await axios.get<ServerResponse & { data: RequestCounter }>(
      url,
      {
        ...options,
      }
    );
    console.log("Aqui");

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while getting the request counter");
  }
};

const generateRequestPDF = async (
  id: string,
  options: AxiosRequestConfig
): Promise<any> => {
  const url = `${baseUrl}/${id}/pdf`;
  const resp = await axios.get(url, { ...options });
  return resp.data;
};

export const RequestService = {
  getAllRequests,
  createRequest,
  approveRequest,
  denyRequest,
  getRequestCountsByStatus,
  generateRequestPDF,
};
