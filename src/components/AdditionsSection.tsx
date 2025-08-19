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
import useAdditions from "../hooks/useAdditions";
import getCroppedImageURL from "../services/image-url";
import { Addition } from "../entities/additions";

// Lazy load the CriticScore component for performance
const CriticScore = lazy(() => import("./CriticScore"));

interface Props {
  gameId: number;
}

interface AdditionCardProps {
  addition: Addition;
}

const AdditionCardSkeleton = () => (
  <Card>
    <Skeleton height="150px" />
    <CardBody>
      <SkeletonText mt="4" noOfLines={2} spacing="4" />
      <Skeleton height="20px" mt="4" />
    </CardBody>
  </Card>
);

const AdditionCard = ({ addition }: AdditionCardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  return (
    <Link to={`/games/${addition.slug}`}>
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
            src={getCroppedImageURL(addition.background_image || "")}
            alt={addition.name || "Addition image"}
            height="150px"
            width="100%"
            objectFit="cover"
            _groupHover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
          />
          {addition.metacritic && (
            <Box position="absolute" top={2} right={2}>
              <Suspense fallback={<Skeleton height="24px" width="40px" />}>
                <CriticScore score={addition.metacritic} />
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
            {addition.name || "Unknown Addition"}
          </Text>
          <HStack justify="space-between" align="center">
            {addition.released && (
              <Badge colorScheme="blue" size="sm">
                {new Date(addition.released).getFullYear()}
              </Badge>
            )}
            {addition.rating_top && (
              <Badge colorScheme="green" size="sm">
                {addition.rating_top}/5
              </Badge>
            )}
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
};

const AdditionsSection = ({ gameId }: Props) => {
  const { data, isLoading, error } = useAdditions(gameId);

  if (error) {
    return (
      <Box mb={8}>
        <Heading size="md" mb={4}>
          DLC & Additions
        </Heading>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>Failed to load additions. Please try again later.</Text>
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box mb={8}>
        <Heading size="md" mb={4}>
          DLC & Additions
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {Array.from({ length: 4 }, (_, index) => (
            <AdditionCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  // Handle the response structure from the API
  const additions = (data?.results || []).filter(isGameAllowed);

  if (additions.length === 0) {
    return (
      <Box mb={8} textAlign="center" py={8}>
        <Heading size="md" mb={4}>
          DLC & Additions
        </Heading>
        <Text color="gray.500">No DLC or additions available</Text>
      </Box>
    );
  }

  return (
    <Box mb={8}>
      <Heading size="md" mb={4}>
        DLC & Additions
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {additions.map((addition: Addition, index: number) => (
          <AdditionCard key={addition.id || addition.slug || index} addition={addition} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdditionsSection;
