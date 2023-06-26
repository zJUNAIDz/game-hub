import { useQuery } from "react-query";
import ApiClient from "../services/api-client";
import Trailer from "../entities/Trailer";

const useTrailers = (id: number) => {
  const apiClient = new ApiClient<Trailer>(`/games/${id}/movies`);

 return useQuery({
    queryKey: ["trailers", id],
    queryFn: apiClient.getAll,
  });
};

export default useTrailers;
