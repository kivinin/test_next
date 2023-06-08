import moviesData from "../../data/movies.json";

export interface Movie {
  id: number;
  title: string;
  image: string;
  description: string;
  team: string[];
  year: number;
  type: string;
  frames: string[];
}
export const getMovies = (): Movie[] => {
  return moviesData.movies;
};

export const getMovieById = (id: string): Promise<Movie | undefined> => {
  return new Promise((resolve) => {
    const movie = moviesData.movies.find((m) => m.id === parseInt(id));
    resolve(movie);
  });
};
