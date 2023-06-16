import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGenre from "../hooks/useGenre";
import usePlatform from "../hooks/usePlatform";
// import { useEffect, useState } from "react";
interface Props {
  gameQuery: GameQuery;
}
const GameHeading = ({ gameQuery }: Props) => {
  // const [heading, setHeading] = useState("Games");

  const genre = useGenre(gameQuery.genreId);
  const platform = usePlatform(gameQuery.platformId);
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
