import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import TvShowDetails from "../pages/TvShowDetails";
import Details from "../pages/Details";
import AllMedia from "../pages/AllMedia";
import Movies from "../pages/Movies";
import Favorites from "../pages/Favorites";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:media_type/:cat/all" element={<AllMedia />} />
      <Route path="/:type" element={<Movies />} />
      <Route path="/favorites" element={<Favorites />} />

      <Route path="/:type/:id" element={<Details />} />
    </Routes>
  );
};

export default App;
