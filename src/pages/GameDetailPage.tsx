import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DefinitionItem from "../components/DefinitionItem";
import ExpandableText from "../components/ExpandableText";
import useGame from "../hooks/useGame";
import CriticScore from "../components/CriticScore";
import GameAttributes from "../components/GameAttributes";
const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug || "no-such-game");

  //fix this game.data thing and make game. work
  // const img_url = game?.data.background_image;
  if (isLoading) return <Spinner />;
  if (error || !game) throw error;
  return (
    <div>
      Name : {game.data.name} <br />
      Description: <br />
      <ExpandableText>{game.data.description_raw}</ExpandableText>
      <GameAttributes game={game.data}/>
      {/* <Image src={getCroppedImageURL(game.data.background_image)} /> */}
    </div>
  );
};

export default GameDetailPage;
