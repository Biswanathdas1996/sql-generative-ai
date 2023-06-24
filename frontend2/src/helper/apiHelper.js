import axios from "axios";
import { BASE_URL, USE_MOCK } from "../config";

const api = axios.create({
  baseURL: BASE_URL,
});

export const get = async (url, params) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
