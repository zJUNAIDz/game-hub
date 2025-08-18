import axios, { AxiosRequestConfig } from "axios";
export interface DataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT ?? "") as string;
const API_KEY = (import.meta.env.VITE_API_KEY ?? "") as string;

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  params: {
    key: API_KEY,
  },
});

class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<DataResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  get = (id: number | string) => axiosInstance.get<T>(this.endpoint + "/" + id);
}
export default ApiClient;
