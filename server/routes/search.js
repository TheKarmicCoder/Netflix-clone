const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY; // Your TMDB API Key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

router.get("/details/:id", async (req, res) => {
    try {
      const movieId = req.params.id;
  
      // Make a request to the TMDB API's movie details endpoint
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
  
      // Extract and send back the movie details
      const movieDetails = response.data;
      res.json(movieDetails);
    } catch (error) {
      console.error("Error while fetching movie details:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;