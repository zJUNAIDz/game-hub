import useGames from "../hooks/useGames";
import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
const GameGrid = () => {
  const { games, error,loading } = useGames();
  if (error) return <Text>{error}</Text>;
  if (loading) return (<Center><Spinner  /></Center>)
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={10}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
