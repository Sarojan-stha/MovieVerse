import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useMovieStore from "../src/zustandStore/useMovieStore";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_URL = `https://image.tmdb.org/t/p/original`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { casts, setCasts, movie, setMovie } = useMovieStore();
  const { id } = useParams();
  const getCasts = async (movie_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${movie_id}/credits`, options);
      const actors = res.data.cast;
      setCasts(actors);
    } catch (err) {
      console.log(err);
    }
  };
  const getMovieDetails = async (movie_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/${movie_id}`, options);
      console.log("details", res.data);
      setMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieDetails(id);
    getCasts(id);
  }, [id]);
  console.log("casts", casts);

  if (!movie) return <div>Loading</div>;

  return (
    <div className="">
      <div className="container">
        <div
          className="h-lvh w-vw bg-cover flex items-center justify-center "
          style={{
            backgroundImage: `url(${IMAGE_URL}/${movie.backdrop_path})`,
          }}
        >
          <div className="containeer  ">
            <div className="h-auto w-72  ">
              <img
                className="bg-cover w-full h-full rounded-2xl drop-shadow-[0_4px_6px_rgba(139,92,246,0.3)]"
                src={`${IMAGE_URL}/${movie.poster_path}`}
                alt="poster.jpg"
              />
            </div>
            <div className="movie-details h-50 w-lg flex flex-col  gap-1.5 ">
              <h1>{movie.title}</h1>
              <div className="flex flex-row">
                {movie.genres.map((m) => (
                  <button>{m.name}</button>
                ))}
              </div>
              <p className="font-semibold text-justify">{movie.overview}</p>
              <div className="flex flex-row gap-0.5">
                {casts.slice(0, 5).map((cast) => {
                  return (
                    <div className="w-28 h-auto  ">
                      <img
                        className=" rounded-2xl"
                        src={`${IMAGE_URL}/${cast.profile_path}`}
                        alt="poster.jpeg"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
