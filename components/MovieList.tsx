import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

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
  years: number[];
  types: string[];
}

const MovieList: React.FC<MovieListProps> = ({ movies, years, types }) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  useEffect(() => {
    applyFilters();
  }, [movies, yearFilter, typeFilter]);

  const applyFilters = () => {
    let filtered = [...movies];

    if (yearFilter) {
      filtered = filtered.filter((movie) => movie.year === yearFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter((movie) => movie.type === typeFilter);
    }

    setFilteredMovies(filtered);
  };

  const handleYearFilterChange = (year: number | undefined) => {
    setYearFilter(year);
  };

  const handleTypeFilterChange = (type: string | undefined) => {
    setTypeFilter(type);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="yearFilter">Выберите год</label>
        <select
          id="yearFilter"
          value={yearFilter || ""}
          onChange={(e) =>
            handleYearFilterChange(parseInt(e.target.value) || undefined)
          }
        >
          <option value="">Все</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="typeFilter">Выберите тип</label>
        <select
          id="typeFilter"
          value={typeFilter || ""}
          onChange={(e) => handleTypeFilterChange(e.target.value || undefined)}
        >
          <option value="">Все</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="mt-2 ml-2">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
