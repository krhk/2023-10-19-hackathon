import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: `https://localhost:44358/api/v1/`,
});

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const get = async (url: string, config?: AxiosRequestConfig<any>) => {
  const requestConfig = {
    headers: { ...defaultHeaders },
    ...config,
  };
  const response = await instance.get(url, requestConfig);
  return response;
};

export const post = async (
  url: string,
  data: any,
  config?: AxiosRequestConfig<any>
) => {
  const requestConfig = {
    headers: { ...defaultHeaders },
    ...config,
  };
  const response = await instance.post(url, data, requestConfig);
  return response;
};
