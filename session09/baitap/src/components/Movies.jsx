import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://674ea952bb559617b26c215b.mockapi.io/api/v1/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => setError(error.message));
  }, []);

  //Tìm kiếm theo tên
  const filteredMovies = movies.filter((movie) =>
    movie.name.trim().toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Search movies by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <td>STT</td>
            <td>Name</td>
            <td>Image</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td>{movie.name}</td>
              <td>
                <img
                  src={movie.image}
                  alt={movie.name}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{movie.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
