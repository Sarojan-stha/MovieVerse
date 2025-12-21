import React from "react";
import { useContext } from "react";
import { MovieContext } from "../userContext/Globalvariables";
import { useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWE1OGZhZDM2M2VmOTFmNmUxYTI3ZmU1MmQyN2NlZCIsIm5iZiI6MTc2NTczMTcwNS45ODMsInN1YiI6IjY5M2VlZDc5MDliMDQzNDA1MTYxYTM4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.or99z9P29k0q_-wH4fGTHJAdUxxbG1mDoW_oW3eFlVc",
//   },
// };

const SearchBar = () => {
  const {
    isLoading,
    setIsLoading,
    setMovies,
    movies,
    searchParams,
    setSearchParams,
  } = useContext(MovieContext);
  const endpoint = API_BASE_URL + `/search/movie?query=spiderman`;

  const searchMovies = async (searchParams) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchParams}&include_adult=false&language=en-US&page=1`;

    console.log("api calling for fetching movies");
    console.log(API_KEY);
    setIsLoading(true);

    try {
      console.log(searchParams);
      const response = await axios.get(url, options);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        className="border "
        type="text"
        placeholder="search for movies"
        onChange={(event) => {
          const value = event.target.value;
          setSearchParams(value);
        }}
      />
      <button
        type="button"
        className="border cursor-pointer"
        onClick={() => searchMovies(searchParams)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
