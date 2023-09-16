import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";


function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  
  // const dataLoading = useSelector((state) => state.netflix.dataLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, [dispatch, genres.length]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded, genres, dispatch]);

  const token = localStorage.getItem("jwtToken"); // Get the JWT token from storage
  
  const hasLoggedToken = useRef(false);
  useEffect(() => {
    if (token && !hasLoggedToken.current) {
     
      hasLoggedToken.current = true;
    }
    if (!token) {
      navigate("/login");
    }
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
 
    window.addEventListener("scroll", handleScroll);
  
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [token, navigate]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className="not-available">
            No TV Shows available for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  );
}


const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`;
export default TVShows;
