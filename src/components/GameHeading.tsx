import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGenre from "../hooks/useGenre";
import usePlatforms from "../hooks/usePlatforms";
// import { useEffect, useState } from "react";
interface Props {
  gameQuery: GameQuery;
}
const GameHeading = ({ gameQuery }: Props) => {
  // const [heading, setHeading] = useState("Games");
  const { data: genres } = useGenre();
  const { data: platforms } = usePlatforms();
  const genre = genres?.results.find((genre) => gameQuery.genreId === genre.id);
  const platform = platforms?.results.find(
    (p) => p.id === gameQuery.platformId
  );
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
