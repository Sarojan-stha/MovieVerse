import React from "react";
import { Navbar } from "../src/components/Navbar";
import { useParams } from "react-router-dom";
import useMovieStore from "../src/zustandStore/useMovieStore";
import MovieCard from "../src/components/MovieCard";

const Movies = () => {
  const { type } = useParams();
  const { trending, tvShows } = useMovieStore();

  const mediaList = type === "movies" ? trending : tvShows;
  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {mediaList.length > 0 ? (
          mediaList.map((media) => <MovieCard key={media.id} movie={media} />)
        ) : (
          <p>No media found</p>
        )}
      </div>
      <button>Load more</button>
    </div>
  );
};

export default Movies;
