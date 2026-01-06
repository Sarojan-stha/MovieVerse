import React from "react";
import useMovieStore from "../src/zustandStore/useMovieStore";
import MovieCard from "../src/components/MovieCard";
import { Navbar } from "../src/components/Navbar";
import { useEffect } from "react";

const Search = () => {
  const {
    isLoading,
    setIsLoading,
    searchResults,
    setSearchResults,
    searchPage,
    setSearchPage,
    searchMovies,
    searchParams,
  } = useMovieStore();
  console.log(searchResults);

  let p = searchPage;
  const handleLoadMore = () => {
    p = p + 1;
    setSearchPage(p);
    console.log("page", searchPage);
    searchMovies(searchParams);
  };

  return (
    <div>
      <Navbar />

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          <div className="grid grid-cols-5 gap-2">
            {searchResults.length > 0 &&
              searchResults.map((movie) => {
                return (
                  <div className="">
                    <MovieCard movie={movie} />
                  </div>
                );
              })}
          </div>
          {searchResults.length > 0 && (
            <button onClick={handleLoadMore}>Load more</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
