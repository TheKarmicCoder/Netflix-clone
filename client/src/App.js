import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MoviePage from "./pages/Movies";
import Home from "./pages/Home";
import Player from "./pages/Player";
import Signup from "./pages/Signup";
import TVShows from "./pages/TVShows";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Navbar setSearchResults={setSearchResults} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/tv" element={<TVShows />} />
        <Route exact path="/movies" element={<MoviePage />} />
        <Route exact path="/new" element={<Player />} />
        <Route exact path="/" element={<Home />} />

        {/* Define a route for the SearchResults component */}
        <Route
          exact
          path="/search-results"
          element={<SearchResults results={searchResults} />}
        />
      </Routes>
    </div>
  );
}
