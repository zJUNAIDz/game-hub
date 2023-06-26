import { Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GameGenreList from "../components/GameGenreList";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import PlatformSelector from "../components/PlatformSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`, //1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "180px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem paddingX={5} area={"aside"}>
          <GameGenreList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <GameHeading />
        <Flex marginBottom={7}>
          <PlatformSelector />
          {/* <SortSelector /> // this components is causing to show explicit games so gotta remove it for a while */}
        </Flex>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
