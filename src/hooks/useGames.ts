import { ReactNode, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
export interface Platform {
  id: number;
  name: string;
  slug:string;
  image: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic:number;

}
interface GameResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<ReactNode>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<GameResponse>("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return { games, error, loading };
};

export default useGames;
