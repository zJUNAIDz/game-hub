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
import useGameQueryStore from "../store";



const GameGenreList = () => {
  const selectedGenreId = useGameQueryStore((select) => select.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((select) => select.setGenreId);
  const skeletonCount = Array.from({ length: 10 });
  const { data, isLoading, error } = useGenres();

  if (error) return <Text color="red">Failed to load genres.</Text>;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <List
        maxHeight="70vh"
        overflowY="auto"
        maxWidth="140px"
        paddingRight={2}
        style={{scrollbarWidth: "thin"}}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {isLoading
          ? skeletonCount.map((_, index) => (
              <ListItem paddingY={2} key={index}>
                <HStack>
                  <Skeleton height={7} width={10} />
                  <Skeleton height={7} width="9rem" />
                </HStack>
              </ListItem>
            ))
          : [
              <ListItem paddingY={2} key="all">
                <Button
                  variant="link"
                  fontWeight={!selectedGenreId ? "bold" : "normal"}
                  opacity={!selectedGenreId ? 1 : 0.6}
                  onClick={() => setSelectedGenreId(null)}
                >
                  All
                </Button>
              </ListItem>,
              ...(data?.results || []).map((genre) => (
                <ListItem paddingY={2} key={genre.id}>
                  <HStack>
                    <Image
                      boxSize="28px"
                      objectFit="cover"
                      borderRadius={8}
                      src={getCroppedImageURL(genre.image_background)}
                      alt={genre.name}
                    />
                    <Button
                      whiteSpace="normal"
                      textAlign="left"
                      fontWeight={selectedGenreId === genre.id ? "bold" : "normal"}
                      opacity={selectedGenreId === genre.id ? 1 : 0.9}
                      onClick={() => setSelectedGenreId(genre.id)}
                      variant="link"
                      _hover={{ textDecoration: "underline" }}
                      overflow="hidden"
                      textOverflow="ellipsis"
                      maxWidth="200px"
                    >
                      {genre.name}
                    </Button>
                  </HStack>
                </ListItem>
              )),
            ]}
      </List>
    </>
  );
};

export default GameGenreList;
