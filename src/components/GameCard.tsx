import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import Game from "../entities/Game";
import PlatformIconsList from "./PlatformIconsList";
import CriticScore from "./CriticScore";
import getCroppedImageURL from "../services/image-url";
import Emojis from "./Emoji";
import { Link } from "react-router-dom";
interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Link to={`games/${game.slug}`}>
      <Card>
        <Image src={getCroppedImageURL(game.background_image)} />
        <CardBody>
          <HStack justifyContent="space-between">
            <PlatformIconsList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <HStack>
              <CriticScore score={game.metacritic} />
              <Emojis rating={game.rating_top} />
            </HStack>
          </HStack>
          <Heading marginY={2} fontSize="1xl">
            {game.name}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  );
};

export default GameCard;
