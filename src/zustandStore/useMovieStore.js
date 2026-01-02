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
  media: null,
  trending: [],
  topRated: [],
  tvShows: [],
  isLoading: false,
  searchParams: "",
  searchResults: [],
  videoKey: "",
  casts: [],
  trailers: [],

  // Setters (replacing setState)
  setErrorMsg: (msg) => set({ errorMsg: msg }),
  setMedia: (value) => set({ media: value }),
  setTrending: (movies) => set({ trending: movies }),
  setTopRated: (movies) => set({ topRated: movies }),
  setTvShows: (movies) => set({ tvShows: movies }),
  setIsLoading: (value) => set({ isLoading: value }),
  setSearchParams: (value) => set({ searchParams: value }),
  setSearchResults: (value) => set({ searchResults: value }),
  setVideoKey: (value) => set({ videoKey: value }),
  setCasts: (value) => set({ casts: value }),
  setTrailers: (value) => set({ trailers: value }),

  fetchMovies: async (url, type) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(url, options);
      const { data } = response;
      console.log("movies", data);
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

  fetchVideoKey: async (movieId) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      options
    );
    const trailer = res.data.results.find(
      (v) => v.site === "YouTube" && v.type.includes("Trailer")
    );

    if (trailer) {
      console.log("trailer key is :", trailer.key);

      set({ videoKey: trailer.key });
    }
    console.log("res.data", res.data);
  },
}));
export default useMovieStore;
