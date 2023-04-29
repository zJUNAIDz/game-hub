import { Grid, GridItem, Show } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <Grid templateAreas={{
        base:`"nav" "main"`,
        lg:`"nav nav" "aside main"`,//1024px

      }}>
        <GridItem style={{ backgroundColor: "green" }} area={"nav"}>
          Nav
        </GridItem>

        <Show above="lg">
          <GridItem style={{ backgroundColor: "red" }} area={"aside"}>
            aside
          </GridItem>
        </Show>
        <GridItem style={{ backgroundColor: "purple" }} area={"main"}>
          main
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
