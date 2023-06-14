import { useInfiniteQuery } from "react-query";
import { GameQuery } from "../App";
import ApiClient, { DataResponse } from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
  // image: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}
const apiClient = new ApiClient<Game>("/games");
const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<DataResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({pageParam = 1}) =>
      apiClient.getAll({
        params: {
          discover:true,
          page: pageParam,
          page_size:20,
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.search,
        },
      
      }),
      getNextPageParam:(lastPage, allPages)=> lastPage.next ? allPages.length + 1 : undefined,
  });

//params:
// params: {
//   // discover:true,
//   page: gameQuery.page,
//   // page_size:20,
//   genres: gameQuery.genre?.id,
//   parent_platforms: gameQuery.platform?.id,
//   ordering: gameQuery.sortOrder,
//   search: gameQuery.search,
// }
// useData<Game>(
//   "/games",
//   //changed from platform to parent_platform to fix the playstation platform bug bug...
//   {
//     params: {
//       // discover:true,
//       page: gameQuery.page,
//       // page_size:20,
//       genres: gameQuery.genre?.id,
//       parent_platforms: gameQuery.platform?.id,
//       ordering: gameQuery.sortOrder,
//       search: gameQuery.search,
//     },
//   },
//   [gameQuery]
// );

export default useGames;
