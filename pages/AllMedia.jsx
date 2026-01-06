import React, { useEffect, useState } from "react";
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
    setTrendingPage,
    topRatedPage,
    tvShowsPage,
    setTopRatedPage,
    setTvShowsPage,
    setCardsLimit,
    isLoading,
    setIsLoading,
  } = useMovieStore();

  // decide which list we are dealing with
  const listKey =
    media_type === "movie" && cat === "trending"
      ? "trending"
      : media_type === "movie" && cat === "topRated"
      ? "topRated"
      : media_type === "tv" && cat === "trending"
      ? "tvShows"
      : null;

  // get correct media list
  const getMediaList = () => {
    if (listKey === "trending") return trending;
    if (listKey === "topRated") return topRated;
    if (listKey === "tvShows") return tvShows;

    return [];
  };

  // get correct page from store
  const getPage = () => {
    if (listKey === "trending") return trendingPage;
    if (listKey === "topRated") return topRatedPage;
    if (listKey === "tvShows") return tvShowsPage;
  };

  const changePage = () => {
    if (listKey === "trending") setTrendingPage(p);
    if (listKey === "topRated") setTopRatedPage(p);
    if (listKey === "tvShows") setTvShowsPage(p);
  };

  // build TMDB URL
  let p = getPage();
  const buildUrl = () => {
    // const page = getPage();

    if (listKey === "trending" && media_type === "movie")
      return `https://api.themoviedb.org/3/trending/movie/day?page=${p}`;

    if (listKey === "topRated")
      return `https://api.themoviedb.org/3/movie/top_rated?page=${p}`;

    if (listKey === "tvShows")
      return `https://api.themoviedb.org/3/trending/tv/day?page=${p}`;

    return null;
  };

  // initial load
  useEffect(() => {
    setCardsLimit(10);
    console.log("list key ho hai", listKey);
    const url = buildUrl();
    if (url && listKey) {
      console.log("list key", listKey);
      const result = getMediaList();
      console.log("result", result);

      if (result && result.length === 0) fetchMovies(url, listKey);
    }
  }, [media_type, cat]);

  const mediaList = getMediaList();
  const handleLoadMore = () => {
    console.log("loading");
    p = p + 1;
    changePage();
    console.log("page", p);

    const url = buildUrl();
    if (!url || !listKey) return;
    console.log("loadmore", listKey);

    fetchMovies(url, listKey);
  };

  console.log(media_type);

  return (
    <div>
      <Navbar />

      {/* Full-page loader for the first fetch */}
      {mediaList.length === 0 && isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Movie grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {mediaList.length > 0 ? (
              mediaList.map((media) => (
                <MovieCard key={media.id} movie={media} />
              ))
            ) : (
              <p>No media found</p>
            )}
          </div>

          {/* Small loader at bottom for Load More */}
          {mediaList.length > 0 && isLoading && (
            <div className="flex justify-center p-4">
              <p>Loading more...</p>
            </div>
          )}

          {/* Load More button only if there are movies */}
          {mediaList.length > 0 && (
            <div className="flex justify-center p-6">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
                disabled={isLoading} // prevent double clicks while loading
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllMedia;
