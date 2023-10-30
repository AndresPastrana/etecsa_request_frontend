import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { IRequest, RequestCounter, ServerResponse } from "../types";
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
  data: IRequest,
  options: AxiosRequestConfig
): Promise<IRequest> => {
  const url = `${baseUrl}/create`;
  const resp = await axios.post(url, data, { ...options });
  const { data: createdData = null } = resp.data;
  return createdData;
};

const approveRequest = async (
  id: string,
  options: AxiosRequestConfig
): Promise<void> => {
  const url = `${baseUrl}/aprove/${id}`;
  await axios.put(url, null, { ...options });
};

const denyRequest = async (
  id: string,
  options: AxiosRequestConfig
): Promise<void> => {
  const url = `${baseUrl}/denied/${id}`;
  await axios.put(url, null, { ...options });
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
