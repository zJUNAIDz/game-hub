import ms from "ms";
import { useQuery } from "react-query";
import genres from "../data/cached-genre";
import ApiClient from "../services/api-client";
import Genre  from "../entities/Genre";

const apiClient = new ApiClient<Genre>("/genres");
// const useGenre = () => useData<Genre>('/genres');
const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24 hours
    initialData: genres,
  });

export default useGenres;
