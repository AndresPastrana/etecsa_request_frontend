import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { DepartmentFormData, IDepartament, ServerResponse } from "../types";

const urlbase = getURL(["SERVER", "PATH_DEPARTMENT"]);

const GetDepartaments = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/`;
    const resp = await axios.get<
      ServerResponse & { data: Array<IDepartament> }
    >(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Erron loading the departments");
  }
};

const GetDepartamentById = async (id: string, options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${id}`;
    const resp = await axios.get<ServerResponse & { data: IDepartament }>(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Erron loading the departments");
  }
};

const CreateDepartament = async (
  data: DepartmentFormData,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/`;
    const resp = await axios.post<ServerResponse & { data: IDepartament }>(
      url,
      data,
      { ...options }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Erron inserting a new department");
  }
};

const UpdateDepartamentById = async (
  data: DepartmentFormData,
  options: AxiosRequestConfig
) => {
  try {
    const { id, ...blob } = data;
    const url = `${urlbase}/${id}`;
    const resp = await axios.put<ServerResponse & { data: IDepartament }>(
      url,
      blob,
      { ...options }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Erron updating a department");
  }
};

const DeleteDepartamentById = async (
  id: string,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}/${id}`;
    const resp = await axios.delete<ServerResponse & { data: IDepartament }>(
      url,
      { ...options }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Erron deleting a department");
  }
};

export const DepartamentService = {
  GetDepartaments,
  GetDepartamentById,
  CreateDepartament,
  UpdateDepartamentById,
  DeleteDepartamentById,
};
