import { Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GameGenreList from "./components/GameGenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenre";
import { Platform } from "./hooks/useGames";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  search: string;
  page:number;
}

const App = () => {
  // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
  //   null
  // );
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
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
        <Navbar
          onSearchQuery={(searchedQuery) =>
            setGameQuery({ ...gameQuery, search: searchedQuery })
          }
        />
      </GridItem>

      <Show above="lg">
        <GridItem paddingX={5} area={"aside"}>
          <GameGenreList 
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) =>
              setGameQuery({ ...gameQuery, genre: genre })
            }
          />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <GameHeading gameQuery={gameQuery}/>
        <Flex marginBottom={7}>
          <PlatformSelector
            onSelectPlatform={(platform) =>
              setGameQuery({ ...gameQuery, platform: platform })
            }
            selectedPlatform={gameQuery.platform}
          />
          <SortSelector
            onSelectSortOrder={(sortOrder) =>
              setGameQuery({ ...gameQuery, sortOrder: sortOrder })
            }
            selectedSortOrder={gameQuery.sortOrder}
          />
        </Flex>

        <GameGrid onPageChange={(pagNumber) => setGameQuery({...gameQuery, page:pagNumber})} gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;
