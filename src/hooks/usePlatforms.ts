import { useQuery } from "react-query";
import useData, { DataResponse } from "./useData";
import apiClient from "../services/api-client";

interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string;
}
// const usePlatforms = () => useData<Platform>("/platforms/lists/parents");
const usePlatforms = () => useQuery({
  queryKey:['platforms'],
  queryFn:()=> apiClient.get<DataResponse<Platform>>('/platforms').then(res => res.data)
})

export default usePlatforms;
