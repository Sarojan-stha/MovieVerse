import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Navbar } from "../src/components/Navbar";
import useMovieStore from "../src/zustandStore/useMovieStore";
import Trailers from "../src/components/Trailers";
import Similar from "../src/components/Similar";

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

const Details = () => {
  const {
    casts,
    setCasts,
    media,
    setMedia,
    setCardsLimit,
    isLoading,
    setIsLoading,
  } = useMovieStore();
  const { id, type } = useParams();

  const mediaType = type;
  const getCasts = async (media_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/${mediaType}/${media_id}/credits`,
        options
      );
      const actors = res.data.cast;
      setCasts(actors);
    } catch (err) {
      console.log(err);
    }
  };
  const getMediaDetails = async (media_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/${mediaType}/${media_id}`,
        options
      );
      setMedia(res.data);
    } catch (err) {
      console.error(
        "API Error:",
        err.response?.status,
        err.response?.data || err.message
      );
    }
  };
  useEffect(() => {
    setCardsLimit(10);

    getMediaDetails(id);
    getCasts(id);
    window.scrollTo(0, 0);
  }, [id]);

  // [id, mediaType]
  if (!media) return <div>Loading</div>;

  return isLoading ? (
    <p>is loading </p>
  ) : (
    <div className="">
      <Navbar />
      <div className="container">
        <div
          className="h-lvh w-vw bg-cover flex items-center justify-center "
          style={{
            backgroundImage: `url(${IMAGE_URL}/${media.backdrop_path})`,
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 w-full z-0"
            style={{
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
            }}
          ></div>

          <div className="containeer  relative z-10 flex gap-6 ">
            <div className="h-auto w-72  ">
              <img
                className="bg-cover w-full h-full rounded-2xl drop-shadow-[0_4px_6px_rgba(139,92,246,0.3)]"
                src={`${IMAGE_URL}/${media.poster_path}`}
                alt="poster.jpg"
              />
            </div>
            <div className="media-details h-50 w-lg flex flex-col  gap-1.5 ">
              <h1>{media.title || media.name}</h1>
              <div className="flex flex-row">
                {media.genres.map((m) => (
                  <button>{m.name}</button>
                ))}
              </div>
              <p className="font-semibold text-justify text-wrap">
                {media.overview}
              </p>
              <p className="font-bold ">Casts</p>
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
      <Trailers media_id={id} mediaType={mediaType} />
      <Similar media_id={id} mediaType={mediaType} />
    </div>
  );
};

export default Details;
