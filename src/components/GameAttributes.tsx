import { SimpleGrid, Text } from "@chakra-ui/react"
import CriticScore from "./CriticScore"
import DefinitionItem from "./DefinitionItem"
import useGame from "../hooks/useGame";
import { Game } from "../entities/Game";
 
interface Props{
  game:Game;
}

const GameAttributes = ({game}:Props) => {

  return (
    <SimpleGrid columns={2} as="dl">
    <DefinitionItem term="Platforms">
      {game.parent_platforms?.map(({ platform }) => (
        <Text key={platform.id} fontWeight="thin" marginY={2}>
          {platform.name}
        </Text>
      ))}
    </DefinitionItem>
    <DefinitionItem term="Metascore">
      <CriticScore score={game.metacritic} />
    </DefinitionItem>
    <DefinitionItem term="Genres">
      {game.genres.map(({ id, name }) => (
        <Text key={id}>{name}</Text>
      ))}
    </DefinitionItem>
    <DefinitionItem term="Publishers">
      {game.publishers?.map(({ id, name }) => (
        <Text key={id}>{name}</Text>
      ))}
    </DefinitionItem>
  </SimpleGrid>
  )
}

export default GameAttributes