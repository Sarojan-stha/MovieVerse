import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import MovieCard from "../MovieCard";

export const SectionSwiper = ({ type }) => {
  return (
    <Swiper
      modules={[FreeMode, Pagination]}
      slidesPerView={"4"}
      spaceBetween={30}
      freeMode={true}
    >
      {type.length > 0 ? (
        type.map((movie) => (
          <SwiperSlide>
            <MovieCard key={movie.id} movie={movie} />
          </SwiperSlide>
        ))
      ) : (
        <div className="border w-full flex flex-col text-shadow-red-800">
          Couldn't find the movie :(
        </div>
      )}
    </Swiper>
  );
};
