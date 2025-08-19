import { SimpleGrid, Text } from "@chakra-ui/react";
import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";
 
interface Props{
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl" spacing={4}>
      <DefinitionItem term="Platforms">
        {game.parent_platforms?.length ? (
          game.parent_platforms.map(({ platform }) => (
            <Text key={platform.id} fontWeight="thin" marginY={2}>
              {platform.name}
            </Text>
          ))
        ) : (
          <Text color="gray.500">Not available</Text>
        )}
      </DefinitionItem>
      
      <DefinitionItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefinitionItem>
      
      <DefinitionItem term="Genres">
        {game.genres?.length ? (
          game.genres.map(({ id, name }) => (
            <Text key={id}>{name}</Text>
          ))
        ) : (
          <Text color="gray.500">Not available</Text>
        )}
      </DefinitionItem>
      
      <DefinitionItem term="Publishers">
        {game.publishers?.length ? (
          game.publishers.map(({ id, name }) => (
            <Text key={id}>{name}</Text>
          ))
        ) : (
          <Text color="gray.500">Not available</Text>
        )}
      </DefinitionItem>

      {game.released && (
        <DefinitionItem term="Release Date">
          <Text>{new Date(game.released).toLocaleDateString()}</Text>
        </DefinitionItem>
      )}

      {game.esrb_rating && (
        <DefinitionItem term="ESRB Rating">
          <Text>{game.esrb_rating.name}</Text>
        </DefinitionItem>
      )}

      {game.rating_top && (
        <DefinitionItem term="Rating">
          <Text>{game.rating_top}/5</Text>
        </DefinitionItem>
      )}

      {game.playtime && (
        <DefinitionItem term="Average Playtime">
          <Text>{game.playtime} hours</Text>
        </DefinitionItem>
      )}
    </SimpleGrid>
  );
};

export default GameAttributes;