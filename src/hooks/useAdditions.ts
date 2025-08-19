import { useQuery } from "react-query";
import { Addition } from "../entities/additions";
import ApiClient from "../services/api-client";

const useAdditions = (id: number) => {
  const apiClient = new ApiClient<Addition>(`games/${id}/additions`);

  return useQuery({
    queryKey: ["additions", id],
    queryFn: apiClient.getAll,
  });
};

export default useAdditions;
