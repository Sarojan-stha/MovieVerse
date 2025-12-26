import { create } from "zustand";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const useMovieStore = create((set) => ({
  errorMsg: "",
  movies: [],
  trending: [],
  topRated: [],
  tvShows: [],
  isLoading: false,
  searchParams: "",

  // Setters (replacing setState)
  setErrorMsg: (msg) => set({ errorMsg: msg }),
  setMovies: (movies) => set({ movies }),
  setTrending: (movies) => set({ trending: movies }),
  setTopRated: (movies) => set({ topRated: movies }),
  setTvShows: (movies) => set({ tvShows: movies }),
  setIsLoading: (value) => set({ isLoading: value }),
  setSearchParams: (value) => set({ searchParams: value }),

  fetchMovies: async (url, type) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(url, options);
      const { data } = response;
      console.log(data);
      switch (type) {
        case "trending":
          set({ trending: data.results });
          break;

        case "topRated":
          set({ topRated: data.results });
          break;

        case "tvShows":
          set({ tvShows: data.results });
          break;

        case "movies":
          set({ movies: data.results });
          break;

        default:
          break;
      }
    } catch (error) {
      set({ errorMsg: "Unable to fetch movies. Please try again later :(" });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
export default useMovieStore;
