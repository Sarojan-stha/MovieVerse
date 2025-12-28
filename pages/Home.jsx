import React from "react";
import { Header } from "../src/components/Header";
import HeroSlide from "../src/components/heroSlide/HeroSlide";
import SearchBar from "../src/components/SearchBar";
import TrendingMovies from "../src/components/sections/TrendingMovies";
import TopRatedMovies from "../src/components/sections/TopRatedMovies";
import TvShows from "../src/components/sections/TvShows";
const Home = () => {
  return (
    <main>
      <Header />
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
