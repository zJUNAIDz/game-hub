import useGames from "../hooks/useGames";
import { Text } from "@chakra-ui/react";
const GameGrid = () => {
  const { games, error } = useGames();
  return (
    <div>
      {error && <Text color="red">{error}!</Text>}
      <ol>
        {games.map((data) => (
          <li key={data.id}>{data.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default GameGrid;
