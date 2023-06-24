import ms from "ms";
import { useQuery } from "react-query";
import genres from "../data/cached-genre";
import ApiClient from "../services/api-client";
interface Games {
  id: number;
  name: string;
}
export interface Genre {
  id: number | null;
  name: string;
  image_background: string;
  games: Games[];
}
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
