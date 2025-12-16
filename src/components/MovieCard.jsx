import React from "react";

const MovieCard = ({
  movie: {
    id,
    title,
    backdrop_path,
    vote_average,
    poster_path,
    original_language,
    release_date,
  },
}) => {
  return (
    <div className="border ">
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
        <span>{vote_average.toFixed(1)}</span>
        <span> • </span>
        <p>{original_language}</p>
        <span> • </span>
        <p>{release_date.split("-")[0]}</p>
      </div>
    </div>
  );
};

export default MovieCard;
