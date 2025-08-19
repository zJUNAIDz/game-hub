import axios, { AxiosRequestConfig } from "axios";
export interface DataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT ?? "https://api.rawg.io/api/") as string;
//this is not a "secret" keys btw...
const API_KEY = (import.meta.env.VITE_API_KEY ?? "c542e67aec3a4340908f9de9e86038af") as string;

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
