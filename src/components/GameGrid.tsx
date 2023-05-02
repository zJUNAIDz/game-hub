import useGames from "../hooks/useGames";
import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
const GameGrid = () => {
  const { games, error, loading } = useGames();
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  if (error) return <Text>{error}</Text>;
  // if (loading) return (<GameCardSkeleton />)
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={10}>
      {loading &&
        skeleton.map((x) => (
          <GameCardContainer>
            <GameCardSkeleton key={x} />
          </GameCardContainer>
        ))}
      {games.map((game) => (
        <GameCardContainer>
          <GameCard key={game.id} game={game} />{" "}
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
