import { Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GameGenreList from "./components/GameGenreList";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import Navbar from "./components/Navbar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

const App = () => {
  // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
  //   null
  // ); 
  // const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, //1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "180px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>

      <Show above="lg">
        <GridItem paddingX={5} area={"aside"}>
          <GameGenreList />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <GameHeading />
        <Flex marginBottom={7}>
          <PlatformSelector />
          <SortSelector />
        </Flex>

        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default App;
