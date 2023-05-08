import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import useGenre, { Genre } from "../hooks/useGenre";
import getCroppedImageURL from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GameGenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { data, isLoading, error } = useGenre();
  if (error) return <Text color="red">{error}</Text>;
  if (isLoading)
    return (
      <List>
        {skeletonCount.map((skeleton) => (
          <ListItem paddingY={2} key={skeleton}>
            <HStack>
              <Skeleton height={7} width={10} />
              <Skeleton height={7} width="9rem" />
            </HStack>
          </ListItem>
        ))}
      </List>
    );
  return (
    <>
      {}
      {data.map((genre) => (
        <List key={genre.id}>
          <ListItem paddingY={2}>
            <HStack>
              <Image
                boxSize="28px"
                borderRadius={8}
                src={getCroppedImageURL(genre.image_background)}
              />
              <Button
                fontWeight={selectedGenre?.id === genre.id ? "bold" : "normal"}
                opacity={selectedGenre?.id === genre.id ? 1 : 0.9}
                onClick={() => onSelectGenre(genre)}
                variant="link"
              >
                {genre.name}
              </Button>
              {/* {genre.name}
              <ListIcon  /> */}
            </HStack>
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default GameGenreList;
