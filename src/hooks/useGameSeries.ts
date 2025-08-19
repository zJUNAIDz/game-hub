import { useQuery } from "react-query";
import { GameSeriesGame } from "../entities/game-series";
import ApiClient from "../services/api-client";

const useGameSeries = (id: number) => {
  const apiClient = new ApiClient<GameSeriesGame>(`games/${id}/game-series`);

  return useQuery({
    queryKey: ["gameSeries", id],
    queryFn: apiClient.getAll,
  });
};

export default useGameSeries;
