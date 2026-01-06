import useMovieStore from "../src/zustandStore/useMovieStore";
import MovieCard from "../src/components/MovieCard";
import { useState } from "react";

import React from "react";
import { Navbar } from "../src/components/Navbar";

const Favorites = () => {
  const { favorites } = useMovieStore();
  const [sortBy, setSortBy] = useState("");

  const filteredFavorites =
    sortBy === ""
      ? favorites // show all if nothing selected
      : favorites.filter((media) => media.media_type === sortBy);
  return (
    <div>
      <Navbar />
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">All Movies & TV</option> {/* default option */}
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>

      {
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((media) => (
              <MovieCard key={media.id} movie={media} />
            ))
          ) : (
            <p>Nothing added to fav</p>
          )}
        </div>
      }
    </div>
  );
};

export default Favorites;
