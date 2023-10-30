import axios, { AxiosRequestConfig } from "axios";
import { getURL } from "../helper";
import { IProduct, ServerResponse } from "../types";

const baseUrl = getURL(["SERVER", "PATH_PRODUCT"]);

const getAllProducts = async (options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}`;
    const resp = await axios.get<ServerResponse & { data: Array<IProduct> }>(
      url,
      {
        ...options,
      }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while getting the products");
  }
};

const getProductById = async (id: string, options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}/${id}`;
    const resp = await axios.get<ServerResponse & { data: IProduct }>(url, {
      ...options,
    });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while getting the product");
  }
};

const createProduct = async (data: IProduct, options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}/${getURL(["PRODUCT_CREATE"])}`;
    const resp = await axios.post<ServerResponse & { data: IProduct }>(
      url,
      data,
      { ...options }
    );
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while creating the product");
  }
};

const updateProductById = async (
  data: IProduct,
  options: AxiosRequestConfig
) => {
  try {
    const { id, ...blob } = data;
    const url = `${baseUrl}/${id}`;
    const resp = await axios.put(url, blob, { ...options });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while updating the product");
  }
};

const deleteProductById = async (id: string, options: AxiosRequestConfig) => {
  try {
    const url = `${baseUrl}/${id}`;
    const resp = await axios.delete(url, { ...options });
    return resp.data.success ? resp.data.data : null;
  } catch (error) {
    throw new Error("Error while deleting the product");
  }
};

export const ProductService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
