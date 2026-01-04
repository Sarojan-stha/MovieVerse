import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../src/components/Navbar";
import MovieCard from "../src/components/MovieCard";
import useMovieStore from "../src/zustandStore/useMovieStore";

const AllMedia = () => {
  const { media_type, cat } = useParams();
  const {
    trending,
    topRated,
    tvShows,
    fetchMovies,
    trendingPage,
    topRatedPage,
    tvShowsPage,
  } = useMovieStore();
  const [page, setPage] = useState(1);

  console.log("media", media_type, "cat", cat);

  const getMediaList = () => {
    if (media_type === "movie" && cat === "trending") return trending;
    if (media_type === "movie" && cat === "topRated") return topRated;
    if (media_type === "tv" && cat === "trending") return tvShows;
    return [];
  };
  const buildUrl = () => {
    if (media_type === "movie" && cat === "trending")
      return `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
    if (media_type === "movie" && cat === "topRated")
      return `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    if (media_type === "tv" && cat === "trending")
      return `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}`;
    return null;
  };

  const mediaList = getMediaList();
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    const url = buildUrl();
    console.log("url", url);

    fetchMovies(url, cat);
  };
  console.log(trending);

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
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default AllMedia;
