import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useGame from "../hooks/useGame";
import ExpandableText from "../components/ExpandableText";
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
      <ExpandableText>
      {game.data.description_raw}
      </ExpandableText>
      {/* <Image src={getCroppedImageURL(game.data.background_image)} /> */}
    </div>
  );
};

export default GameDetailPage;
