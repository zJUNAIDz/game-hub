import useGames from "../hooks/useGames";
import { Badge, SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenre";
interface Props {
  selectedGenre: Genre | null;
}

const GameGrid = ({ selectedGenre }: Props) => {
  const { data, error, isLoading } = useGames(selectedGenre);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  if (error) return <Text colorScheme="red">{error}</Text>;
  if (isLoading)
    return (
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={1}>
        {skeleton.map((x) => (
          <GameCardContainer key={x}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    );
  return (
    <>
      {(selectedGenre && !isLoading) ? <Badge marginBottom='1rem'>Genre: {selectedGenre?.name}</Badge> : <Badge marginBottom='1rem'>Home</Badge>}
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={1}>
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
