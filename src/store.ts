import { create } from "zustand";
interface GameQuery {
  // genre: Genre | null;
  genreId?: number | null;
  platformId?: number | null;
  sortOrder?: string;
  search?: string;
}
interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (genreId: number) => void;
  setPlatformId: (platformId: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearch: (search: string) => void;
}

const useGameQueryStore =  create<GameQueryStore>((set) => ({
  gameQuery: {},
  setSearch: (search) => set(() => ({ gameQuery: { search } })),
  setGenreId: (genreId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genreId } })),
  setPlatformId: (platformId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platformId } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
}));

export default useGameQueryStore;