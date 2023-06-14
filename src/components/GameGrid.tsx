import { Box, Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
interface Props {
  gameQuery: GameQuery;
  onPageChange: (page: number) => void;
  // selectedGenre: Genre | null;
  // selectedPlatform: Platform | null;
}

const GameGrid = ({ gameQuery }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGames(gameQuery);
  const fetchedGamesCount = data?.pages.reduce(
    (total, page) => total + page.results.length + 1,
    0
  ) || 0  ;

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
    <Box padding={10}>
      {/* {(selectedGenre && !isLoading) ? <Badge marginBottom='1rem'>Genre: {selectedGenre?.name}</Badge> : <Badge marginBottom='1rem'>Home</Badge>} */}
      <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={()=> fetchNextPage()}
      loader={
        <Spinner/>
      }
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
          {/* {data?.results.map((game) => (
          <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
        ))} */}
        </SimpleGrid>
      </InfiniteScroll>

      {/* {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading" : "Load More"}
        </Button>
      )} */}
      {/* <PageNavigationButton
        currentPageNumber={gameQuery.page}
        onClick={(pageNumber) => {
          onPageChange(pageNumber);
          window.scrollTo(0, 0);
        }}
      /> */}
    </Box>
  );
};

export default GameGrid;
