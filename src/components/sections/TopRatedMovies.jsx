import React, { useContext } from "react";
import CircularIndeterminate from "../CircularIndeterminate";
import { useEffect } from "react";
import useMovieStore from "../../zustandStore/useMovieStore";
import { SectionSwiper } from "./section-sliders";
import { useNavigate } from "react-router-dom";
const TopRatedMovies = () => {
  const { topRated, setTopRated, fetchMovies, isLoading, errorMsg } =
    useMovieStore();
  const navigate = useNavigate();
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

  useEffect(() => {
    if (topRated && topRated.length === 0) fetchMovies(url, "topRated");
  }, []);

  return (
    <div className="border">
      <div className="flex flex-row justify-between">
        <div>Top Rated Movies</div>
        <button onClick={() => navigate("/movie/topRated/all")}>
          Load more
        </button>
      </div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <div>
          <SectionSwiper type={topRated} />
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;
