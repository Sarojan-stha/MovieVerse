import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalTrailer from "../ModalTrailer";
import useMovieStore from "../../zustandStore/useMovieStore";
import axios from "axios";
import "./heroSlide.css";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const IMG_BASE_URL = "http://image.tmdb.org/t/p/original";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const HeroSlide = () => {
  const navigate = useNavigate();
  const { setVideoKey, fetchVideoKey } = useMovieStore();
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeMovie, setActiveMovie] = useState(null);
  const handleWatchNow = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const fetchnowPlayingMovies = async () => {
    try {
      const response = await axios.get(url, options);
      const { data } = response;
      setnowPlayingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchnowPlayingMovies();
  }, []);
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      pagination={true}
      slidesPerView={1}
      loop={true}
      // onSlideChange={() => console.log("slide change")}
    >
      {nowPlayingMovies
        .slice(0, 12)
        .map(({ id, title, overview, backdrop_path, poster_path }) => (
          <SwiperSlide key={id}>
            <div
              className="h-lvh w-vw bg-cover flex items-center justify-center "
              style={{
                backgroundImage: `url(${IMG_BASE_URL}${backdrop_path})`,
              }}
            >
              <div className="containeer  ">
                <div className="movie-details h-50 w-lg flex flex-col gap-1.5 ">
                  <h1>{title}</h1>
                  <p className="font-semibold text-justify">{overview}</p>
                  <div className="buttons">
                    <button
                      className=" hover:bg-red-700 active:bg-red-800"
                      onClick={() => handleWatchNow(id)}
                    >
                      Watch now
                    </button>
                    <button
                      onClick={() => {
                        setActiveMovie(id);
                        setShowModal(true);
                        fetchVideoKey(id);
                        // document.body.style.overflow = "hidden";
                      }}
                      className="hover:bg-white hover:text-red-700  active:bg-amber-50 active:text-red-700"
                    >
                      Watch trailer
                    </button>
                  </div>
                </div>
                <div className="h-auto w-72  ">
                  <img
                    className="bg-cover w-full h-full rounded-2xl drop-shadow-[0_4px_6px_rgba(139,92,246,0.3)]"
                    src={`${IMG_BASE_URL}${poster_path}`}
                    alt="poster.jpg"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      <ModalTrailer showModal={showModal} close={() => setShowModal(false)} />
    </Swiper>
  );
};

export default HeroSlide;
