import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import useGame from "../hooks/useGame";
import GameTrailer from "../components/GameTrailer";
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
      <GameTrailer gameId={game.data.id}/>
      Description: <br />
      <ExpandableText>{game.data.description_raw}</ExpandableText>
      <GameAttributes game={game.data}/>
      {/* <Image src={getCroppedImageURL(game.data.background_image)} /> */}
    </div>
  );
};

export default GameDetailPage;
