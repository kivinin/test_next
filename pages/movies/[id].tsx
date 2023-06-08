import React, { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarousel";
import { useRouter } from "next/router";
import { Movie, getMovieById } from "../api/api";

const MoviePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const fetchedMovie = await getMovieById(id.toString());
        setMovie(fetchedMovie);
      }
    };

    fetchMovie();
  }, [id]);

  const handleImageClick = (frames: string[]) => {
    setSelectedFrames(frames);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
    setSelectedFrames([]);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1>{movie.title}</h1>
        <img
          src={movie.image}
          alt={movie.title}
          onClick={() => handleImageClick(movie.frames)}
        />
        <p>{movie.description}</p>
        <p>Команда: {movie.team.join(", ")}</p>
        <p>Год: {movie.year}</p>
        <p>Тип: {movie.type}</p>
        {isCarouselOpen && (
          <MovieCarousel frames={selectedFrames} onClose={closeCarousel} />
        )}
      </div>
    </div>
  );
};

export default MoviePage;
