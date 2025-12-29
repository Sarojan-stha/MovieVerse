import React from "react";
import useMovieStore from "../src/zustandStore/useMovieStore";
import MovieCard from "../src/components/MovieCard";
import { Header } from "../src/components/Header";

const Search = () => {
  const { isLoading, setIsLoading, searchResults, setSearchResults } =
    useMovieStore();
  console.log(searchResults);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-5 gap-2">
        {searchResults.map((movie) => {
          return (
            <div className="">
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
      <button>Load more</button>
    </div>
  );
};

export default Search;
