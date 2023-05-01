import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import PlatformIconsList from "./PlatformIconsList";
import CriticScore from "./CriticScore";
interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  return (
    <Card overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <HStack justifyContent='space-between'>
          <PlatformIconsList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <CriticScore  score={game.metacritic} />
        </HStack>

        <Heading fontSize="1xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
