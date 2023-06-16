import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageURL from "../services/image-url";

interface Props {
  onSelectGenreId: (genreId: number | null) => void;
  selectedGenreId: number | null;
}

const GameGenreList = ({ onSelectGenreId, selectedGenreId }: Props) => {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { data, isLoading, error } = useGenres();
  if (error) return <Text color="red"></Text>;
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
    <Heading fontSize='2xl' marginBottom={3}>Genres</Heading>
    <Image src=""/>
    <Button variant='link'marginLeft={7} opacity={selectedGenreId ? 0.6 :1} onClick={()=> onSelectGenreId(null)}>All</Button>
      {data?.results.map((genre) => (
        <List key={genre.id}>
          <ListItem paddingY={2}>
            <HStack>
              <Image
                boxSize="28px"
                objectFit="cover"
                borderRadius={8}
                src={getCroppedImageURL(genre.image_background)}
              />
              <Button
                //important for correct alignment of texts
                whiteSpace="normal"
                textAlign="left"
                fontWeight={selectedGenreId === genre.id ? "bold" : "normal"}
                opacity={selectedGenreId === genre.id ? 1 : 0.9}
                onClick={() => onSelectGenreId(genre.id)}
                variant="link"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        </List>
      ))}
    </>
  );
};

export default GameGenreList;
