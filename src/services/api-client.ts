import axios, { AxiosRequestConfig } from "axios";
export interface DataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    // key: "eda951b243dd43e2a563774e03bd36b6",
    key: "c542e67aec3a4340908f9de9e86038af",
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
