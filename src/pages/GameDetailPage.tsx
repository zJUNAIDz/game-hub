

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
  AlertDescription
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

  // Dynamic metadata
  const metaTitle = gameData.name ? `${gameData.name} - IGDB` : "Game Details - IGDB";
  const metaDescription = gameData.description_raw?.slice(0, 160) || "View details, screenshots, and more for this game on IGDB.";
  const metaImage = getCroppedImageURL(gameData.background_image || "");
  const metaUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
      <Container maxW="container.xl" py={{ base: 4, md: 8 }} px={{ base: 2, md: 4 }}>
        <VStack spacing={{ base: 6, md: 10 }} align="stretch">
          {/* Header Section */}
          <Box as="header" w="full" pb={2} borderBottomWidth={1} borderColor={borderColor}>
            <VStack spacing={2} align="start" w="full">
              <Heading size="xl" color="purple.400" wordBreak="break-word">
                {gameData.name}
              </Heading>
              {gameData.name_original && gameData.name_original !== gameData.name && (
                <Text fontSize="md" color="gray.500" fontStyle="italic">
                  {gameData.name_original}
                </Text>
              )}
              {Array.isArray(gameData.alternative_names) && gameData.alternative_names.length > 0 && (
                <Text fontSize="sm" color="gray.400">
                  Also known as: {gameData.alternative_names.join(", ")}
                </Text>
              )}
              <HStack spacing={2} wrap="wrap" pt={1}>
                {gameData.metacritic && <CriticScore score={gameData.metacritic} />}
                {gameData.released && (
                  <Badge colorScheme="blue" px={2} py={1} fontSize="xs">
                    {new Date(gameData.released).toLocaleDateString()}
                  </Badge>
                )}
                {gameData.esrb_rating && (
                  <Badge colorScheme="orange" px={2} py={1} fontSize="xs">
                    {gameData.esrb_rating.name}
                  </Badge>
                )}
                {gameData.rating_top && (
                  <Badge colorScheme="green" px={2} py={1} fontSize="xs">
                    {gameData.rating_top}/5
                  </Badge>
                )}
                {gameData.ratings_count && (
                  <Badge colorScheme="purple" px={2} py={1} fontSize="xs">
                    {gameData.ratings_count} ratings
                  </Badge>
                )}
                {gameData.suggestions_count && (
                  <Badge colorScheme="teal" px={2} py={1} fontSize="xs">
                    {gameData.suggestions_count} suggestions
                  </Badge>
                )}
              </HStack>
            </VStack>
          </Box>

          {/* Main Content Grid - Responsive */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 10 }}>
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
                      h={{ base: "180px", sm: "250px", md: "300px" }}
                      objectFit="cover"
                    />
                  </Box>
                )}

                {/* Quick Facts Section */}
                <Box bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor} p={4}>
                  <Heading size="sm" mb={2} color="purple.400">Quick Facts</Heading>
                  <HStack spacing={4} wrap="wrap">
                    {gameData.playtime && (
                      <Badge colorScheme="purple">Avg. Playtime: {gameData.playtime}h</Badge>
                    )}
                    {gameData.achievements_count && (
                      <Badge colorScheme="yellow">Achievements: {gameData.achievements_count}</Badge>
                    )}
                    {gameData.screenshots_count && (
                      <Badge colorScheme="blue">Screenshots: {gameData.screenshots_count}</Badge>
                    )}
                    {gameData.movies_count && (
                      <Badge colorScheme="red">Movies: {gameData.movies_count}</Badge>
                    )}
                    {gameData.parents_count && (
                      <Badge colorScheme="gray">Parents: {gameData.parents_count}</Badge>
                    )}
                    {gameData.additions_count && (
                      <Badge colorScheme="cyan">Additions: {gameData.additions_count}</Badge>
                    )}
                    {gameData.game_series_count && (
                      <Badge colorScheme="teal">Series: {gameData.game_series_count}</Badge>
                    )}
                  </HStack>
                </Box>

                {/* Trailer */}
                <Box>
                  <Heading size="md" mb={3} color="purple.400">
                    Trailer
                  </Heading>
                  <GameTrailer gameId={gameData.id} />
                </Box>

                {/* Screenshots */}
                <Box>
                  <Heading size="md" mb={3} color="purple.400">
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
                  <Heading size="md" mb={3} color="purple.400">
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
                  <Heading size="md" mb={3} color="purple.400">
                    Game Details
                  </Heading>
                  <GameAttributes game={gameData} />
                </Box>

                {/* Tags/Keywords */}
                {Array.isArray(gameData.tags) && gameData.tags.length > 0 && (
                  <Box>
                    <Heading size="sm" mb={2} color="purple.400">Tags</Heading>
                    <HStack spacing={2} wrap="wrap">
                      {gameData.tags.map((tag: { id: number; name: string }) => (
                        <Badge key={tag.id} colorScheme="purple" variant="subtle">{tag.name}</Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                {/* Social & External Links */}
                {(gameData.website || gameData.reddit_url || gameData.twitch_count || gameData.youtube_count) && (
                  <Box>
                    <Heading size="sm" mb={2} color="purple.400">Links</Heading>
                    <HStack spacing={4} wrap="wrap">
                      {gameData.website && (
                        <Box as="a" href={gameData.website} target="_blank" rel="noopener noreferrer" color="purple.400" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                          Official Website
                        </Box>
                      )}
                      {gameData.reddit_url && (
                        <Box as="a" href={gameData.reddit_url} target="_blank" rel="noopener noreferrer" color="orange.400" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                          Reddit
                        </Box>
                      )}
                      {gameData.twitch_count && (
                        <Box as="span" color="purple.500">Twitch: {gameData.twitch_count}</Box>
                      )}
                      {gameData.youtube_count && (
                        <Box as="span" color="red.500">YouTube: {gameData.youtube_count}</Box>
                      )}
                    </HStack>
                  </Box>
                )}
              </VStack>
            </GridItem>
          </Grid>

          {/* Additional Sections */}
          <VStack spacing={8} align="stretch">
            <Suspense fallback={<SectionSkeleton />}>
              <AdditionsSection gameId={gameData.id} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <GameSeriesSection gameId={gameData.id} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
              <SuggestedGamesSection gameId={gameData.id} />
            </Suspense>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default GameDetailPage;
