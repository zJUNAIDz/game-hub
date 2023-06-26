import { Box, Spinner } from "@chakra-ui/react";
import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}
const GameTrailer = ({ gameId }: Props) => {
  const { data: trailer, isLoading, error } = useTrailers(gameId);
  console.log(trailer);

  if (isLoading) return <Spinner />;
  if (error) throw error;
  const firstTrailer = trailer?.results[0];
  if (!firstTrailer) return null;
  return (
    <Box >
      <video
        width="640px"
        height="480px"
        src={firstTrailer?.data[480]}
        poster={firstTrailer?.preview}
        controls
      >
        Your Browser does not supports Video.
      </video>
      <b>{firstTrailer.name}</b>
    </Box>
  );
};

export default GameTrailer;
