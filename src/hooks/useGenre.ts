import useData from "./useData";
interface Games{
  id:number;
  name:string;
}
export interface Genre{
  id:number;
  name:string;
  image_background:string;
  games:Games[]
}

const useGenre = () => useData<Genre>('/genres');

export default useGenre;