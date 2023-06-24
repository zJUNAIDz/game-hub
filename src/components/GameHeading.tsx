import { Heading } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
import useGameQueryStore from "../store";
// import { useEffect, useState } from "react";

const GameHeading = () => {
  // const [heading, setHeading] = useState("Games");
  const genreId = useGameQueryStore((select) => select.gameQuery.genreId);
  const platformId = useGameQueryStore((select) => select.gameQuery.platformId);
  const genre = useGenre(genreId);
  const platform = usePlatform(platformId);
  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;
  // useEffect(() => {
  //   if (gameQuery.genre) setHeading(`${gameQuery.genre.name} Games`);
  //   if (gameQuery.platform) setHeading(`${gameQuery.platform.name} Games`);
  //   if (gameQuery.platform && gameQuery.genre)
  //     setHeading(`${gameQuery.platform.name} ${gameQuery.genre.name} Games`);
  // }, [gameQuery]);
  return (
    <Heading as="h1" marginBottom={5}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
