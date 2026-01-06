import React, { useEffect } from "react";
import useMovieStore from "../zustandStore/useMovieStore";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Trailers = ({ media_id, mediaType }) => {
  const { trailers, setTrailers } = useMovieStore();
  const embedUrl = `https://www.youtube.com/embed`;

  const getTrailers = async (media_id, mediaType) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${media_id}/videos`,
        options
      );
      setTrailers(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrailers(media_id, mediaType);
  }, [media_id]);

  return (
    <div className="flex flex-col justify-center items-center gap-20">
      {trailers.slice(0, 5).map((trailer) => (
        <div className="relative w-[1020px] m-8 aspect-video bg-black rounded-xl overflow-hidden animate-fadeIn">
          <iframe
            src={`${embedUrl}/${trailer.key}?autoplay=0`}
            frameborder="0"
            className="w-full h-full"
            allow="encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Trailers;
