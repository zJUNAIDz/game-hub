import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug || 'no-such-game');
  // const img_url = game?.data.background_image;
  if(isLoading) return <Spinner />;
  if(error || !game) throw error;
  return (
    <div>
      Name : {game.data.name} <br />
      Description: <br />
      {game.data.description_raw}
      {/* <Image src={getCroppedImageURL(game.data.background_image)} /> */}
    </div>
  );
};

export default GameDetailPage;
