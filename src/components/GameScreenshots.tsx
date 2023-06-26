import { Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import useScreenshot from "../hooks/useScreenshot";
interface Props {
  id: number;
}
const GameScreenshots = ({ id }: Props) => {
  const { data: screenshots, isLoading, error } = useScreenshot(id);
  console.log(screenshots?.results);
  if (isLoading) return <Spinner />;
  if (error) throw error;
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
      {screenshots?.results.map((screenshot) => (
        <Image
          key={screenshot.id}
          src={screenshot.image}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
