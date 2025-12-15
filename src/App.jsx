import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const fetchMovies = async () => {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const App = () => {
  useEffect(() => {
    fetchMovies();
  }, []);

  return <div>App</div>;
};

export default App;
