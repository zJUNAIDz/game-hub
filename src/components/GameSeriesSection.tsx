import { isGameAllowed } from "../utils/gameFilters";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  HStack,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import useGameSeries from "../hooks/useGameSeries";
import getCroppedImageURL from "../services/image-url";
import { GameSeriesGame } from "../entities/game-series";

// Lazy load the CriticScore component for performance
const CriticScore = lazy(() => import("./CriticScore"));

interface Props {
  gameId: number;
}

interface GameSeriesCardProps {
  game: GameSeriesGame;
}

const GameSeriesCardSkeleton = () => (
  <Card>
    <Skeleton height="150px" />
    <CardBody>
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
      <Skeleton height="20px" mt="4" />
    </CardBody>
  </Card>
);

const GameSeriesCard = ({ game }: GameSeriesCardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  return (
    <Link to={`/games/${game.slug}`}>
      <Card
        transition="all 0.2s"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
          borderColor: "purple.300",
        }}
        borderColor={borderColor}
        role="group"
      >
        <Box position="relative" overflow="hidden">
          <Image
            src={getCroppedImageURL(game.background_image || "")}
            alt={game.name || "Game image"}
            height="150px"
            width="100%"
            objectFit="cover"
            _groupHover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          />
          {game.metacritic && (
            <Box position="absolute" top={2} right={2}>
              <Suspense fallback={<Skeleton height="24px" width="40px" />}>
                <CriticScore score={game.metacritic} />
              </Suspense>
            </Box>
          )}
        </Box>
        <CardBody>
          <Text
            fontWeight="semibold"
            fontSize="md"
            noOfLines={2}
            mb={2}
            color="purple.400"
          >
            {game.name || "Unknown Game"}
          </Text>
          <HStack justify="space-between" align="center">
            {game.released && (
              <Badge colorScheme="blue" size="sm">
                {new Date(game.released).getFullYear()}
              </Badge>
            )}
            {game.rating_top && (
              <Badge colorScheme="green" size="sm">
                {game.rating_top}/5
              </Badge>
            )}
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

const GameSeriesSection = ({ gameId }: Props) => {
  const { data, isLoading, error } = useGameSeries(gameId);

  if (error) {
    return (
      <Box mb={8}>
        <Heading size="md" mb={4}>
          Game Series
        </Heading>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>Failed to load game series. Please try again later.</Text>
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box mb={8}>
        <Heading size="md" mb={4}>
          Game Series
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {Array.from({ length: 4 }, (_, index) => (
            <GameSeriesCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  // Handle the response structure from the API
  const seriesGames = (data?.results || []).filter(isGameAllowed);

  if (seriesGames.length === 0) {
    return (
      <Box mb={8} textAlign="center" py={8}>
        <Heading size="md" mb={4}>
          Game Series
        </Heading>
        <Text color="gray.500">No games in this series available</Text>
      </Box>
    );
  }

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>
        Game Series
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {seriesGames.map((game, index) => (
          <GameSeriesCard key={game.id || game.slug || index} game={game} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GameSeriesSection;
