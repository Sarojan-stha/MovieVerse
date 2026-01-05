import React, { useContext } from "react";
import CircularIndeterminate from "../CircularIndeterminate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMovieStore from "../../zustandStore/useMovieStore";
import { SectionSwiper } from "./section-sliders";

const TvShows = () => {
  const { tvShows, setTvShows, fetchMovies, isLoading, errorMsg } =
    useMovieStore();
  const navigate = useNavigate();
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

  useEffect(() => {
    if (tvShows && tvShows.length === 0) fetchMovies(url, "tvShows");
  }, []);
  return (
    <div className="border">
      <div className="flex flex-row justify-between">
        <div>TV Shows</div>
        <button onClick={() => navigate("/tv/trending/all")}>Load more</button>
      </div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <div>
          <SectionSwiper type={tvShows} />
        </div>
      )}
    </div>
  );
};

export default TvShows;
