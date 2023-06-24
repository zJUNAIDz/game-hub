import useGenres from "./useGenres";

const useGenre = (id: number | null) => {
  const { data: genres } = useGenres();
  return genres?.results.find((genre) => genre.id === id);
};
export default useGenre;
