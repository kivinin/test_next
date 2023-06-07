import React, { useState } from "react";
import MovieModal from "./MovieModal";

interface Movie {
  id: number;
  title: string;
  image: string;
  description: string;
  team: string[];
  year: number;
  type: string;
  frames: string[];
}

interface MovieListProps {
  movies: Movie[];
  year: number;
  type: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, year, type }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const filteredMovies = movies.filter((movie) => {
    if (year === 0 && type === "") {
      return true;
    }
    if (year === 0) {
      return movie.type === type;
    }
    if (type === "") {
      return movie.year === year;
    }
    return movie.year === year && movie.type === type;
  });

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col items-center"
            onClick={() => openModal(movie)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-auto mb-2"
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieList;
