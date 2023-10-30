import axios from "axios";
import { getURL } from "../helper";
import { ServerResponse } from "../types";
import { LogedUser } from "../context/Auth";
// LOGIN
// Define the base URL for your API
const baseUrl = getURL(["SERVER", "PATH_AUTH", "LOGIN"]);
// Create a function to perform user login
const login = async (username: string, password: string) => {
  const url = `${baseUrl}`;
  const data = { username, password };

  try {
    const response = await axios.post<
      ServerResponse & { data: Pick<LogedUser, "access_token"> }
    >(url, data);

    return response.data.success === true ? response.data.data : null;
  } catch (error) {
    throw new Error("Error while login");
  }
};

export const AuthService = {
  login,
};
