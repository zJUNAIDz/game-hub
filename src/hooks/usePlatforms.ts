import { useQuery } from "react-query";
import apiClient, { DataResponse } from "../services/api-client";
import { Platform } from "./useGames";
// import cachedPlatforms from "../data/cached-platforms";


// const usePlatforms = () => useData<Platform>("/platforms/lists/parents");
const usePlatforms = () => useQuery({
  queryKey:['platforms'],
  queryFn:()=> apiClient.get<DataResponse<Platform>>('/platforms/lists/parents').then(res => res.data), //platform/lists/parents provides the parent platform name instead of various versions of same ..like ps 1 ps 2 ❌ Ps✅
  staleTime:24*60*60*1000,//24 hours
  // initialData:{count:platforms.length, results: cachedPlatforms}
})

export default usePlatforms;
