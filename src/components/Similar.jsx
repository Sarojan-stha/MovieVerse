import React, { useEffect } from "react";
import useMovieStore from "../zustandStore/useMovieStore";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { SectionSwiper } from "./sections/section-sliders";
import CircularIndeterminate from "../components/CircularIndeterminate";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Similar = ({ media_id, mediaType }) => {
  const {
    similar,
    setSimilar,
    isLoading,
    setIsLoading,
    errorMsg,
    setErrorMsg,
    similarPage,
    setSimilarPage,
    setCardsLimit,
    cardsLimit,
  } = useMovieStore();
  const embedUrl = `https://www.youtube.com/embed`;

  const getSimilar = async (media_id, mediaType) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${media_id}/similar?page=${similarPage}`,
        options
      );
      setSimilar([...similar, ...res.data.results]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setCardsLimit(cardsLimit + 5);

    let p = similarPage;
    p = p + 1;
    setSimilarPage(p);
    getSimilar(media_id, mediaType);
  };

  useEffect(() => {
    getSimilar(media_id, mediaType);
  }, [media_id]);

  return (
    <div className="border rounded-2xl">
      <div className="flex flex-row justify-between">
        <div>Similar</div>
        <button onClick={handleLoadMore}>Load more</button>
      </div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <div>
          <SectionSwiper
            type={similar.map((m) => ({ ...m, media_type: mediaType }))} //adding mediatype to the similar media object
          />
        </div>
      )}
    </div>
  );
};

export default Similar;
