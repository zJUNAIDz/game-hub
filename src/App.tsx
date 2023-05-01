import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, //1024px
      }}
    >
      <GridItem area={"nav"}>
        <Navbar />
      </GridItem>

      <Show above="lg">
        <GridItem area={"aside"}>aside Section</GridItem>
      </Show>
      <GridItem padding={5} area={"main"}>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default App;
