import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css"; // Make sure this file has your improved CSS

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?YOUR_API_KEY&s=${encodeURIComponent(query)}`
      );

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch movies. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ padding: "2rem", color: "white", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>🎬 Movie Search</h1>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search"
          placeholder="🔍 Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 25px",
            fontSize: "1rem",
            backgroundColor: "#4484c4",
            border: "none",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#306f9c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4484c4")}
        >
          🔎 Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Movie Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              background: "#1e1e1e",
              padding: "1rem",
              borderRadius: "12px",
              width: "220px",
              height: "480px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={`/movie/${movie.imdbID}`}
              style={{ textDecoration: "none", color: "white", textAlign: "center" }}
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.Title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3 style={{ marginTop: "0.5rem", fontSize: "1rem", minHeight: "48px" }}>
                {movie.Title}
              </h3>
              <p style={{ color: "#ccc" }}>{movie.Year}</p>
            </Link>

            <button
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.Title + " trailer"
                  )}`,
                  "_blank"
                )
              }
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "10px",
                fontSize: "0.9rem",
                backgroundColor: "#ff2e63",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#cc234f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff2e63")}
            >
              ▶️ Play Trailer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
