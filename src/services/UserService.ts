import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { IUser, ServerResponse, UserFormData } from "../types";

// Required Bearer token
const urlbase = getURL(["SERVER", "PATH_USER"]);

const createNewUser = async (
  user: UserFormData,
  options: AxiosRequestConfig
) => {
  try {
    const url = `${urlbase}${getURL(["USER_CREATE"])}`;
    const resp = await axios.post<ServerResponse & { data: IUser }>(url, user, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error creating a new user");
  }
};
const UpdateUser = async (user: UserFormData, options: AxiosRequestConfig) => {
  try {
    const { id, ...blob } = user;
    const url = `${urlbase}/${id}`;
    const resp = await axios.put<ServerResponse & { data: IUser }>(url, blob, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error updating a new user");
  }
};

// role required in the query params
const getUsersByRole = async (options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}${getURL(["USER_GET"])}`;
    const resp = await axios.get<ServerResponse & { data: Array<IUser> }>(url, {
      ...options,
    });

    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while getting user by role");
  }
};

// Id required
const getUserById = async (userId: string, options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${userId}`;
    const resp = await axios.get<ServerResponse & { data: IUser }>(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while getting user by id");
  }
};
// Id required
const deleteUserById = async (userId: string, options: AxiosRequestConfig) => {
  try {
    const url = `${urlbase}/${userId}`;
    const resp = await axios.delete<ServerResponse & { data: string }>(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while deleting user by id");
  }
};
export const UserService = {
  createNewUser,
  getUsersByRole,
  getUserById,
  deleteUserById,
  UpdateUser,
};
