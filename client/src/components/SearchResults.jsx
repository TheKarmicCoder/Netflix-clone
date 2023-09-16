// src/components/SearchResults.jsx

import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
