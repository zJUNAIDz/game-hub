import { useQuery } from "react-query";
import ApiClient from "../services/api-client";
// import cachedPlatforms from "../data/cached-platforms";
export interface Platform {
  id: number;
  name: string;
  slug: string;
  // image: string;
}
//platform/lists/parents provides the parent platform name instead of various versions of same ..like ps 1 ps 2 ❌ Ps✅
const apiClient = new ApiClient<Platform>("/platforms/lists/parents");
// const usePlatforms = () => useData<Platform>("/platforms/lists/parents");
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,

    staleTime: 24 * 60 * 60 * 1000, //24 hours
    // initialData:{count:platforms.length, results: cachedPlatforms}
  });

export default usePlatforms;
