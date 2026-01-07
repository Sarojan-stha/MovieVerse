import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const useMovieStore = create((set, get) => ({
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
  similar: [],
  trendingPage: 1,
  topRatedPage: 1,
  tvShowsPage: 1,
  similarPage: 1,
  searchPage: 1,
  cardsLimit: 10,
  favorites: [],
  loadMore: false,

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
  setSimilar: (value) => set({ similar: value }),
  setTrendingPage: (value) => set({ trendingPage: value }),
  setTopRatedPage: (value) => set({ topRatedPage: value }),
  setTvShowsPage: (value) => set({ trendingPage: value }),
  setSimilarPage: (value) => set({ similarPage: value }),
  setSearchPage: (value) => set({ searchPage: value }),
  setCardsLimit: (value) => set({ cardsLimit: value }),
  setFavorites: (value) => set({ favorites: value }),
  setLoadMore: (value) => set({ loadMore: value }),

  fetchMovies: async (url, type) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(url, options);
      const { data } = response;
      const { results } = data;
      switch (type) {
        case "trending":
          set((state) => ({
            trending: [...state.trending, ...results],
          }));
          console.log("results", results);
          break;

        case "topRated":
          set((state) => ({
            topRated: [
              ...state.topRated,
              ...results.map((movie) => ({ ...movie, media_type: "movie" })), //adding media_type as topRated doesnt include it
            ],
          }));

          break;

        case "tvShows":
          set((state) => ({
            tvShows: [...state.tvShows, ...results],
          }));
          break;

        case "movies":
          set((state) => ({
            movies: [...state.movies, ...results],
          }));
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

  searchMovies: async (searchParams) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${searchParams}&include_adult=false&language=en-US&page=${
          get().searchPage
        }`,
        options
      );
      get().loadMore
        ? set((state) => ({
            searchResults: [...state.searchResults, ...response.data.results],
          }))
        : set({ searchResults: response.data.results });
    } catch (error) {
      set({ errorMsg: "Unable to search movies. Please try again later :(" });
      console.log(error);
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
