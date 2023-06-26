import ms from "ms";
import { useInfiniteQuery } from "react-query";
import ApiClient, { DataResponse } from "../services/api-client";
import useGameQueryStore from "../store";
import Game  from "../entities/Game";
const apiClient = new ApiClient<Game>("/games");
const useGames = () => {
  const gameQuery = useGameQueryStore((select) => select.gameQuery);

  return useInfiniteQuery<DataResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          discover: true,
          page: pageParam,
          page_size: 20,
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery?.search,
        },
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    staleTime: ms("24h"), //24hours
  });
};
export default useGames;
