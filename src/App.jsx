import React from "react";
import axios from "axios";
import CircularIndeterminate from "./components/CircularIndeterminate";
import SearchBar from "./components/SearchBar";
import { MovieContext } from "./userContext/Globalvariables";
import { useContext } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${API_KEY}`,
//   },
// };

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const App = () => {
  const {
    errorMsg,
    setErrorMsg,
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    searchParams,
    setSearchParams,
  } = useContext(MovieContext);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoint, options);
      const { data } = response;
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      setErrorMsg("Unable to fetch movies. Please try again later :(");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <header>
        <div className="flex flex-col items-center border h1 text-9xl h-fit w-full my-2">
          Header
        </div>
      </header>
      <section>
        <SearchBar />

        <div>Movies list</div>
        {isLoading ? (
          <CircularIndeterminate />
        ) : errorMsg ? (
          <p className="text-red-600">{errorMsg}</p>
        ) : (
          <div>
            <ul className="grid grid-cols-4 border gap-4">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <div className="border w-full flex flex-col text-shadow-red-800">
                  Couldn't find the movie :(
                </div>
              )}
            </ul>
          </div>
        )}
      </section>
      <footer></footer>
    </main>
  );
};

export default App;
