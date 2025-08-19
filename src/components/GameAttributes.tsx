import { SimpleGrid, Tag, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";
 
interface Props{
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={2} as="dl" spacing={4}>
      <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Platforms</Text>}>
        {game.parent_platforms?.length ? (
          <Wrap>
            {game.parent_platforms.map(({ platform }) => (
              <WrapItem key={platform.id}>
                <Tag size="md" variant="solid" colorScheme="blue">
                  <Text fontSize="sm">{platform.name}</Text>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Text fontSize="sm" color="gray.500">Not available</Text>
        )}
      </DefinitionItem>

      <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Metascore</Text>}>
        <CriticScore score={game.metacritic} />
      </DefinitionItem>

      <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Genres</Text>}>
        {game.genres?.length ? (
          <Wrap>
            {game.genres.map(({ id, name }) => (
              <WrapItem key={id}>
                <Tag size="md" variant="solid" colorScheme="green">
                  <Text fontSize="sm">{name}</Text>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Text fontSize="sm" color="gray.500">Not available</Text>
        )}
      </DefinitionItem>

      <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Publishers</Text>}>
        {game.publishers?.length ? (
          <Wrap>
            {game.publishers.map(({ id, name }) => (
              <WrapItem key={id}>
                <Tag size="md" variant="solid" colorScheme="purple">
                  <Text fontSize="sm">{name}</Text>
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          <Text fontSize="sm" color="gray.500">Not available</Text>
        )}
      </DefinitionItem>

      {game.released && (
        <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Release Date</Text>}>
          <Tag size="md" variant="subtle" colorScheme="orange">
            <Text fontSize="sm">{new Date(game.released).toLocaleDateString()}</Text>
          </Tag>
        </DefinitionItem>
      )}

      {game.esrb_rating && (
        <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">ESRB Rating</Text>}>
          <Tag size="md" variant="solid" colorScheme="red">
            <Text fontSize="sm">{game.esrb_rating.name}</Text>
          </Tag>
        </DefinitionItem>
      )}

      {game.rating_top && (
        <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Rating</Text>}>
          <Tag size="md" variant="solid" colorScheme="yellow">
            <Text fontSize="sm">{game.rating_top}/5</Text>
          </Tag>
        </DefinitionItem>
      )}

      {game.playtime && (
        <DefinitionItem term={<Text fontSize="lg" fontWeight="bold">Average Playtime</Text>}>
          <Tag size="md" variant="solid" colorScheme="teal">
            <Text fontSize="sm">{game.playtime} hours</Text>
          </Tag>
        </DefinitionItem>
      )}
  {/* System Requirements Section (compact, scrollable) */}
  {/* <SystemRequirementsBox platforms={game.platforms} /> */}
    </SimpleGrid>
  );
};

export default GameAttributes;