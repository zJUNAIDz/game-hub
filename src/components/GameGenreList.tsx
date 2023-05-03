import {
  HStack,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import getCroppedImageURL from "../services/image-url";

const GameGenreList = () => {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { data, isLoading, error } = useGenre();
  return (
    <>
      {error && <Text color="red">{error}</Text>}
      {isLoading && (
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
      )}

      {data.map((genre) => (
        <List key={genre.id}>
          <ListItem paddingY={2}>
            <HStack>
              <Image
                boxSize="28px"
                borderRadius={8}
                src={getCroppedImageURL(genre.image_background)}
              />
              <Text fontWeight="bold">{genre.name}</Text>

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
