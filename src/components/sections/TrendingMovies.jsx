import React, { useContext } from "react";
import CircularIndeterminate from "../CircularIndeterminate";
import useMovieStore from "../../zustandStore/useMovieStore";
import { useEffect } from "react";
import { SectionSwiper } from "./section-sliders";
import { useNavigate } from "react-router-dom";
const TrendingMovies = () => {
  const {
    trending,
    setTrending,
    fetchMovies,
    isLoading,
    errorMsg,
    trendingPage,
  } = useMovieStore();
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const navigate = useNavigate();
  useEffect(() => {
    if (trending && trending.length === 0) fetchMovies(url, "trending");
  }, []);

  return (
    <div className="border">
      <div className="flex flex-row justify-between">
        <div>Trending Movies</div>
        <button onClick={() => navigate("/movie/trending/all")}>
          Load more
        </button>
      </div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <div>
          <SectionSwiper type={trending} />
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
