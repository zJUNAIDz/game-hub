import { useQuery } from "react-query";
import Screenshot  from "../entities/Screenshot";
import ApiClient from "../services/api-client";

const useScreenshot = (id: number) => {
  const apiClient = new ApiClient<Screenshot>(`games/${id}/screenshots`);
  return useQuery({
    queryKey: ["screenshots", id],
    queryFn: apiClient.getAll,
  });
};

export default useScreenshot;
