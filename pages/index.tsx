import React from "react";
import { GetServerSideProps } from "next";
import MovieList from "../components/MovieList";
import { getMovies } from "./api/api";

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

interface HomeProps {
  movies: Movie[];
  years: number[];
  types: string[];
}

const Home: React.FC<HomeProps> = ({ movies, years, types }) => {
  return (
    <div>
      <h1 className="text-center my-8">
        ТОП-10 самых низкорейтинговых фильмов
      </h1>
      <MovieList movies={movies} years={years} types={types} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const movies = await getMovies();
  const years = Array.from(new Set(movies.map((movie) => movie.year))).sort();
  const types = Array.from(new Set(movies.map((movie) => movie.type)));

  return {
    props: {
      movies,
      years,
      types,
    },
  };
};

export default Home;
