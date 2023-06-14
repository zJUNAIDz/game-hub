import { Box, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
interface Props {
  gameQuery: GameQuery;
  onPageChange: (page: number) => void;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading, hasNextPage, fetchNextPage } =
    useGames(gameQuery);
  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length + 1, 0) ||
    0;

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  if (error) return <Text colorScheme="red">{error.message}</Text>;
  if (isLoading)
    return (
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 3, xl: 4 }} spacing={5}>
        {skeleton.map((x) => (
          <GameCardContainer key={x}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    );
  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Box width={100} alignContent='center'><Spinner /></Box>}
    >
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 3, xl: 4 }} spacing={5}>
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
