import React, { useEffect } from "react";
import { Navbar } from "../src/components/Navbar";
import HeroSlide from "../src/components/heroSlide/HeroSlide";
import SearchBar from "../src/components/SearchBar";
import TrendingMovies from "../src/components/sections/TrendingMovies";
import TopRatedMovies from "../src/components/sections/TopRatedMovies";
import TvShows from "../src/components/sections/TvShows";
import useMovieStore from "../src/zustandStore/useMovieStore";
const Home = () => {
  const { setCardsLimit } = useMovieStore();
  useEffect(() => {
    setCardsLimit(10);
  }, []);
  return (
    <main>
      <Navbar />
      <HeroSlide />
      <section>
        <SearchBar />
        <TrendingMovies />
        <TopRatedMovies />
        <TvShows />
      </section>
      <footer></footer>
    </main>
  );
};

export default Home;
