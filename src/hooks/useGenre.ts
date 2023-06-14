import { useQuery } from "react-query";
// import useData from "./useData";
import genres from '../data/cached-genre';
import apiClient, { DataResponse } from "../services/api-client";
interface Games {
  id: number;
  name: string;
}
export interface Genre {
  id: number;
  name: string;
  image_background: string;
  games: Games[];
}

// const useGenre = () => useData<Genre>('/genres');
const useGenre = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      apiClient.get<DataResponse<Genre>>("/genres").then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: genres,
  });

export default useGenre;
