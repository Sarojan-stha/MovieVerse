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
    searchPage,
    setSearchPage,
    searchMovies,
    setLoadMore,
  } = useMovieStore();

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
        onClick={() => {
          setLoadMore(false);
          searchMovies(searchParams);
          navigate("/search");
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
