import { SkeletonText, Text } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";

const GameGenreList = () => {
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { data, isLoading, error } = useGenre();
  return (
    <>
      {error && <Text color="red">{error}</Text>}
      {isLoading &&
        skeletonCount.map((skeleton) => (
          <li key={skeleton}>
            <SkeletonText width="9rem" />
          </li>
        ))}
      {data.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </>
  );
};

export default GameGenreList;
