import { ReactNode, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface DataResponse<T> {
  count: number;
  // next: string;
  // previous: string;
  results: T[];
}
const  useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);

  const [error, setError] = useState<ReactNode>();
  const [isLoading, setLoading] = useState(false);
  const dependencies = deps ? [...deps] : []; // Must have used it directly but anyways..

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiClient
      .get<DataResponse<T>>(endpoint, {
        ...requestConfig,
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data.results);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, isLoading };
};

export default useData;
