import React from "react";
import axios from "axios";
import CircularIndeterminate from "./components/CircularIndeterminate";

import "./App.css";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

const App = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(endpoint, options);
      const { data } = response;
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      setErrorMsg("Unable to fetch movies. Please try again later :(");
      console.error(error);
    } finally {
      setisLoading(false);
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
        <div>Movies list</div>
        {isLoading ? (
          <CircularIndeterminate />
        ) : errorMsg ? (
          <p className="text-red-600">{errorMsg}</p>
        ) : (
          <div>
            <ul className="grid grid-cols-4 border gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          </div>
        )}
      </section>
      <footer></footer>
    </main>
  );
};

export default App;
