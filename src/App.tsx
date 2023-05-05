import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GameGenreList from "./components/GameGenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenre";

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  console.log(selectedGenre);
  
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
          <GameGenreList selectedGenre={selectedGenre} onSelect={(genre)=>setSelectedGenre(genre)}/>
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <GameGrid selectedGenre={selectedGenre}/>
      </GridItem>
    </Grid>
  );
};

export default App;
