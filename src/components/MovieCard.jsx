import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  movie: {
    id,
    title,
    backdrop_path,
    vote_average,
    poster_path,
    original_language,
    release_date,
    first_air_date,
    media_type,
  },
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="border cursor-pointer"
      onClick={() => navigate(`/${media_type}/${id}`)}
    >
      <div className="border h-full">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : "no-movie.png"
          }
          alt="image"
        />
        <h3>{title}</h3>
        <img className="inline" src="/public/assets/star.svg" alt="star" />
        <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
        <span> • </span>
        <p>{original_language}</p>
        <span> • </span>
        <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;
