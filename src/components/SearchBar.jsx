import React from "react";
import useMovieStore from "../zustandStore/useMovieStore";
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

const SearchBar = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    setIsLoading,
    setSearchResults,
    searchResults,
    searchParams,
    setSearchParams,
  } = useMovieStore();

  const searchMovies = async (searchParams) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${searchParams}&include_adult=false&language=en-US&page=1`;

    console.log("api calling for fetching movies");
    console.log(API_KEY);
    setIsLoading(true);

    try {
      console.log(searchParams);
      const response = await axios.get(url, options);
      console.log(response.data.results);
      setSearchResults(response.data.results);
      navigate("/search");
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
