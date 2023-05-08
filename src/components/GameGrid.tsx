import useGames from "../hooks/useGames";
import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import PageNavigationButton from "./PageNavigationButton";
import { GameQuery } from "../App";
interface Props {
  gameQuery: GameQuery;
  // selectedGenre: Genre | null;
  // selectedPlatform: Platform | null;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, next, previous, error, isLoading } = useGames(gameQuery);
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
      {/* {(selectedGenre && !isLoading) ? <Badge marginBottom='1rem'>Genre: {selectedGenre?.name}</Badge> : <Badge marginBottom='1rem'>Home</Badge>} */}
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={2}>
        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
      <PageNavigationButton
        next={next}
        previous={previous}
        onClick={(um) => console.log(um)}
      />
    </>
  );
};

export default GameGrid;
