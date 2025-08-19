import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
  Image,
  Badge,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";
import getCroppedImageURL from "../services/image-url";
import CriticScore from "../components/CriticScore";

// Lazy load the additional sections for performance
const SuggestedGamesSection = lazy(() => import("../components/SuggestedGamesSection"));
const GameSeriesSection = lazy(() => import("../components/GameSeriesSection"));
const AdditionsSection = lazy(() => import("../components/AdditionsSection"));

// Skeleton components for lazy-loaded sections
const SectionSkeleton = () => (
  <Box mb={8}>
    <Skeleton height="24px" width="200px" mb={4} />
    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
      {Array.from({ length: 4 }, (_, index) => (
        <Box key={index}>
          <Skeleton height="150px" borderRadius="md" />
          <Skeleton height="20px" mt={2} />
          <Skeleton height="16px" mt={1} width="80%" />
        </Box>
      ))}
    </Grid>
  </Box>
);

const GameDetailPage = () => {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useGame(slug || "no-such-game");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (isLoading) {
    return (
      <Container maxW="8xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="60px" />
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
            <GridItem>
              <Skeleton height="400px" borderRadius="lg" />
            </GridItem>
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="100px" />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    );
  }

  if (error || !game?.data) {
    return (
      <Container maxW="8xl" py={8}>
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Game not found!</AlertTitle>
            <AlertDescription>
              The game you're looking for doesn't exist or couldn't be loaded.
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  const gameData = game.data;

  return (
    <Container maxW="8xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Box>
          <VStack spacing={4} align="start">
            <HStack spacing={4} wrap="wrap">
              <Heading size="2xl" color="purple.400">
                {gameData.name}
              </Heading>
              {gameData.metacritic && (
                <CriticScore score={gameData.metacritic} />
              )}
            </HStack>
            
            <HStack spacing={4} wrap="wrap">
              {gameData.released && (
                <Badge colorScheme="blue" px={3} py={1}>
                  Released: {new Date(gameData.released).toLocaleDateString()}
                </Badge>
              )}
              {gameData.esrb_rating && (
                <Badge colorScheme="orange" px={3} py={1}>
                  {gameData.esrb_rating.name}
                </Badge>
              )}
              {gameData.rating_top && (
                <Badge colorScheme="green" px={3} py={1}>
                  Rating: {gameData.rating_top}/5
                </Badge>
              )}
            </HStack>
          </VStack>
        </Box>

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
          {/* Left Column - Media */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Hero Image */}
              {gameData.background_image && (
                <Box
                  bg={bgColor}
                  borderRadius="lg"
                  overflow="hidden"
                  border="1px"
                  borderColor={borderColor}
                >
                  <Image
                    src={getCroppedImageURL(gameData.background_image)}
                    alt={`${gameData.name} background`}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                  />
                </Box>
              )}

              {/* Trailer */}
              <Box>
                <Heading size="md" mb={4}>
                  Trailer
                </Heading>
                <GameTrailer gameId={gameData.id} />
              </Box>

              {/* Screenshots */}
              <Box>
                <Heading size="md" mb={4}>
                  Screenshots
                </Heading>
                <GameScreenshots id={gameData.id} gameName={gameData.name} />
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - Info */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Description */}
              <Box>
                <Heading size="md" mb={4}>
                  About
                </Heading>
                {gameData.description_raw ? (
                  <ExpandableText>{gameData.description_raw}</ExpandableText>
                ) : (
                  <Text color="gray.500">No description available</Text>
                )}
              </Box>

              {/* Game Attributes */}
              <Box>
                <Heading size="md" mb={4}>
                  Game Details
                </Heading>
                <GameAttributes game={gameData} />
              </Box>

              {/* Additional Stats */}
              {(gameData.achievements_count || gameData.screenshots_count || gameData.movies_count) && (
                <Box>
                  <Heading size="md" mb={4}>
                    Statistics
                  </Heading>
                  <VStack spacing={2} align="stretch">
                    {gameData.achievements_count && (
                      <HStack justify="space-between">
                        <Text>Achievements:</Text>
                        <Badge>{gameData.achievements_count}</Badge>
                      </HStack>
                    )}
                    {gameData.screenshots_count && (
                      <HStack justify="space-between">
                        <Text>Screenshots:</Text>
                        <Badge>{gameData.screenshots_count}</Badge>
                      </HStack>
                    )}
                    {gameData.movies_count && (
                      <HStack justify="space-between">
                        <Text>Movies/Trailers:</Text>
                        <Badge>{gameData.movies_count}</Badge>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              )}

              {/* Website Link */}
              {gameData.website && (
                <Box>
                  <Heading size="md" mb={4}>
                    Links
                  </Heading>
                  <Box
                    as="a"
                    href={gameData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="purple.400"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Official Website
                  </Box>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>

        {/* Additional Sections */}
        <VStack spacing={8} align="stretch">
          {/* Additions Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <AdditionsSection gameId={gameData.id} />
          </Suspense>

          {/* Game Series Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <GameSeriesSection gameId={gameData.id} />
          </Suspense>

          {/* Suggested Games Section */}
          <Suspense fallback={<SectionSkeleton />}>
            <SuggestedGamesSection gameId={gameData.id} />
          </Suspense>
        </VStack>
      </VStack>
    </Container>
  );
};

export default GameDetailPage;
