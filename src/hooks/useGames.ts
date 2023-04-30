import { ReactNode, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
}
interface GameResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<ReactNode>();
  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<GameResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setError("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
