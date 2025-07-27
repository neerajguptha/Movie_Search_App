// // Filename - components/Detail.js

// import React from "react";

// function Detail({ selected, closeDetail }) {
//     return (
//         <section className="detail">
//             <div className="content">
//                 <h2>{selected.Title}</h2>
//                 <span>{selected.Year}</span>
//                 <p className="rating">
//                     Rating: {selected.imdbRating}
//                 </p>

//                 <div className="about">
//                     <img src={selected.Poster} alt="" />

//                     <p>{selected.Plot}</p>
//                 </div>
//                 <button
//                     className="close"
//                     onClick={closeDetail}
//                 >
//                     Close
//                 </button>
//             </div>
//         </section>
//     );
// }

// export default Detail;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const apiurl = "https://www.omdbapi.com/?apikey=a2526df0";

    useEffect(() => {
        axios(apiurl + "&i=" + id).then(({ data }) => {
            setMovie(data);
        });
    }, [id]);

    return movie ? (
        <section className="detail" style={{ padding: "2rem", color: "white" }}>
            <div className="content">
                {/* ✅ Back Button with Styling */}
                <Link
                    to="/"
                    style={{
                        display: "inline-block",
                        marginBottom: "1.5rem",
                        padding: "10px 20px",
                        backgroundColor: "#444",
                        color: "#fff",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                        transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#666")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#444")}
                >
                    ⬅ Back to Search
                </Link>

                <h2>{movie.Title}</h2>
                <span>{movie.Year}</span>
                <p className="rating">Rating: {movie.imdbRating}</p>

                <div className="about" style={{ display: "flex", gap: "1.5rem" }}>
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        style={{
                            width: "200px",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                    />
                    <p>{movie.Plot}</p>
                </div>
            </div>
        </section>
    ) : (
        <h2 style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
            Loading...
        </h2>
    );
}

export default MovieDetail;
