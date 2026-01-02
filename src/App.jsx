import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import TvShowDetails from "../pages/TvShowDetails";
import Details from "../pages/Details";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:type/:id" element={<Details />} />
    </Routes>
  );
};

export default App;
