import { useQuery } from "react-query";
import { GameQuery } from "../App";
import apiClient, { DataResponse } from "../services/api-client";

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

const useGames = (gameQuery: GameQuery) =>
  useQuery<DataResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient
        .get<DataResponse<Game> >("/games", {
          params: {
            // discover:true,
            page: gameQuery.page,
            // page_size:20,
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.search,
          },
        })
        .then((res) => res.data),
  });
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
