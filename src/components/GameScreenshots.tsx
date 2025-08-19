import { Box, Spinner, Text } from "@chakra-ui/react";
import useScreenshot from "../hooks/useScreenshot";
import Carousel from "./Carousel";
import getCroppedImageURL from "../services/image-url";

interface Props {
  id: number;
  gameName?: string;
}

const GameScreenshots = ({ id, gameName = "Game" }: Props) => {
  const { data: screenshots, isLoading, error } = useScreenshot(id);

  if (isLoading) return <Spinner size="lg" />;
  if (error) throw error;

  const screenshotUrls = screenshots?.results?.map((screenshot) => 
    getCroppedImageURL(screenshot.image)
  ) || [];

  if (screenshotUrls.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No screenshots available</Text>
      </Box>
    );
  }

  return (
    <Box w="100%" py={4}>
      <Carousel
        images={screenshotUrls}
        altPrefix={`${gameName} screenshot`}
        showThumbnails={true}
        ariaLabel={`Screenshots for ${gameName}`}
      />
    </Box>
  );
};

export default GameScreenshots;
