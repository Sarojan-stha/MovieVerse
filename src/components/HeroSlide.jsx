import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

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
        delay: 3500,
        disableOnInteraction: true,
      }}
      slidesPerView={1}
      loop={true}
      onSlideChange={() => console.log("slide change")}
    >
      {trendingMovies.slice(0, 6).map((movie) => (
        <SwiperSlide>
          <div className="h-lvh w-full bg-violet-300">{movie.title}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlide;
