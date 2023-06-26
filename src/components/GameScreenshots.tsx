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
    <SimpleGrid columns={{ base: 1, md: 2 }}>
      {screenshots?.results.map((screenshot) => (
        <Image
          key={screenshot.id}
          border="3px solid black"
          src={screenshot.image}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
