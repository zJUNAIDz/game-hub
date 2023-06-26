import ms from "ms";
import { useQuery } from "react-query";
import cachedPlatforms from "../data/cached-platforms";
import ApiClient from "../services/api-client";
import Platform  from "../entities/Platform";

//platform/lists/parents provides the parent platform name instead of various versions of same ..like ps 1 ps 2 ❌ Ps✅
const apiClient = new ApiClient<Platform>("/platforms/listFs/parents");
// const usePlatforms = () => useData<Platform>("/platforms/lists/parents");
const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,

    staleTime: ms("24h"), //24 hours
    initialData: cachedPlatforms,
  });

export default usePlatforms;
