
import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import GameGenreList from "../components/GameGenreList";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import PlatformSelector from "../components/PlatformSelector";


const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>IGDB Game Hub - Discover Games</title>
        <meta name="description" content="Discover, browse, and explore video games by genre, platform, and more. Powered by IGDB." />
        <meta property="og:title" content="IGDB Game Hub - Discover Games" />
        <meta property="og:description" content="Discover, browse, and explore video games by genre, platform, and more. Powered by IGDB." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/src/assets/igdb-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IGDB Game Hub - Discover Games" />
        <meta name="twitter:description" content="Discover, browse, and explore video games by genre, platform, and more. Powered by IGDB." />
        <meta name="twitter:image" content="/src/assets/igdb-logo.png" />
      </Helmet>
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
          <GridItem paddingX={5} area={"aside"} overflow="hidden" maxWidth="120px">
            <Box position="fixed" maxHeight="100vh" overflowY="auto">
              <GameGenreList />
            </Box>
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
    </>
  );
};

export default HomePage;
