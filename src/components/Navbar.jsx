import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between border h-fit w-full my-2">
      <Link to="/">Home</Link>
      <SearchBar />
    </div>
  );
};
