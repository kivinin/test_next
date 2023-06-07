import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import moviesData from '../data/movies.json';

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

const movies: Movie[] = moviesData.movies;

export default function Home() {
  const [year, setYear] = useState<number>(0);
  const [type, setType] = useState<string>('');

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const filteredMovies = movies.filter(movie => {
    if (year === 0 && type === '') {
      return true;
    }
    if (year === 0 && type !== '') {
      return movie.type === type;
    }
    if (year !== 0 && type === '') {
      return movie.year === year;
    }
    return movie.year === year && movie.type === type;
  });

  const years = Array.from(new Set(movies.map(movie => movie.year))).sort();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">ТОП-10 самых низкорейтинговых фильмов</h1>
      <div className="mb-4">
        <label htmlFor="year-select" className="mr-2">Выберите год:</label>
        <select
          id="year-select"
          value={year}
          onChange={handleYearChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={0}>Все</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="type-select" className="mr-2">Выберите тип:</label>
        <select
          id="type-select"
          value={type}
          onChange={handleTypeChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Все</option>
          <option value="кино">Кино</option>
          <option value="сериал">Сериал</option>
        </select>
      </div>
      <MovieList movies={filteredMovies} year={year} type={type} />
    </div>
  );
}
