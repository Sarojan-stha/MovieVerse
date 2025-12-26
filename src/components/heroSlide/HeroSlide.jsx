import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
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
  const [trendingMovies, settrendingMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(url, options);
      console.log(response.data);
      const { data } = response;
      settrendingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      slidesPerView={1}
      loop={true}
      onSlideChange={() => console.log("slide change")}
    >
      {trendingMovies
        .slice(0, 12)
        .map(({ id, title, overview, backdrop_path, poster_path }) => (
          <SwiperSlide>
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
                    <button className=" hover:bg-red-700 active:bg-red-800">
                      Watch now
                    </button>
                    <button className="hover:bg-white hover:text-red-700  active:bg-amber-50 active:text-red-700">
                      Watch trailer{" "}
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
    </Swiper>
  );
};

export default HeroSlide;
