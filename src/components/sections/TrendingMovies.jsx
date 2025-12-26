import React, { useContext } from "react";
import { MovieContext } from "../../userContext/Globalvariables";
import CircularIndeterminate from "../CircularIndeterminate";
import MovieCard from "../MovieCard";

const TrendingMovies = () => {
  const { isLoading, errorMsg, movies } = useContext(MovieContext);

  return (
    <>
      <div>Trending Movies</div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <div>
          <ul className="grid grid-cols-4 border gap-4">
            {movies.length > 0 ? (
              movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <div className="border w-full flex flex-col text-shadow-red-800">
                Couldn't find the movie :(
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default TrendingMovies;
