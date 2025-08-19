import { Box, Spinner, Text, Alert, AlertIcon } from "@chakra-ui/react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data: trailer, isLoading, error } = useTrailers(gameId);

  if (isLoading) return <Spinner size="lg" />;
  
  if (error) {
    return (
      <Alert status="warning" borderRadius="md">
        <AlertIcon />
        <Text>Unable to load trailer</Text>
      </Alert>
    );
  }

  const firstTrailer = trailer?.results?.[0];
  
  if (!firstTrailer || !firstTrailer.data) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No trailer available</Text>
      </Box>
    );
  }

  // Get the best quality available (prefer 480p, fallback to max available)
  const videoUrl = firstTrailer.data[480] || firstTrailer.data.max || Object.values(firstTrailer.data)[0];

  return (
    <Box w="100%">
      <Box
        bg="black"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        paddingBottom="56.25%" // 16:9 aspect ratio
        height={0}
      >
        <video
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          src={videoUrl}
          poster={firstTrailer.preview}
          controls
          playsInline
          preload="metadata"
        >
          Your browser does not support video playback.
        </video>
      </Box>
      {firstTrailer.name && (
        <Text mt={3} fontWeight="semibold" textAlign="center">
          {firstTrailer.name}
        </Text>
      )}
    </Box>
  );
};

export default GameTrailer;
