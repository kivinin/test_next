import React from "react";
import Link from "next/link";
import Image from "next/image";

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

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="flex flex-col items-center mb-4 ">
      <Link href={`/movies/${movie.id}`}>
        <div>
          <Image src={movie.image} alt={movie.title} width={300} height={300} />
          <h3 className="text-center">{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
