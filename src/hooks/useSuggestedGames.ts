import { useQuery } from "react-query";
import { SuggestedGame } from "../entities/suggested-game";
import ApiClient from "../services/api-client";

const useSuggestedGames = (id: number) => {
  const apiClient = new ApiClient<SuggestedGame>(
    `games/${id}/suggested`
  );

  return useQuery({
    queryKey: ["suggestedGames", id],
    queryFn: apiClient.getAll,
  });
};

export default useSuggestedGames;
