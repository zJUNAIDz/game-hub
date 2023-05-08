import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
// import { useEffect, useState } from "react";
interface Props {
  gameQuery: GameQuery;
}
const GameHeading = ({ gameQuery }: Props) => {
  // const [heading, setHeading] = useState("Games");
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  } Games`;
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
