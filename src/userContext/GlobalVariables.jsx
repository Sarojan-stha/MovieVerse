import React from "react";
import { createContext, useContext } from "react";
import { useState } from "react";

export const MovieContext = createContext();

const Globalvariables = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  return (
    <MovieContext.Provider
      value={{
        errorMsg,
        setErrorMsg,
        movies,
        setMovies,
        isLoading,
        setIsLoading,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default Globalvariables;
