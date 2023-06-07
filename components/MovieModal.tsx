import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

interface MovieModalProps {
  movie: Movie;
  closeModal: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, closeModal }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const [selectedImage, setSelectedImage] = useState<string>("");

  const openImageModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage("");
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {movie.title}
                </h3>
                <div className="mt-2">
                  <img src={movie.image} alt={movie.title} className="w-full" />
                </div>
                <p>{movie.description}</p>
                <p>{movie.team}</p>
                <p>Год выпуска: {movie.year}</p>
                <p>Тип: {movie.type}</p>
              </div>
            </div>
            {selectedImage && (
              <div className="flex flex-col items-stretch">
                <div className="flex-grow">
                  <img
                    src={selectedImage}
                    alt="Увеличенное фото"
                    className="w-full"
                  />
                </div>
                <button onClick={closeImageModal} className="mt-2 self-center">
                  Закрыть
                </button>
              </div>
            )}

            <h3 className="text-center mt-4">Кадры из фильма:</h3>
            <Carousel
              responsive={responsive}
              containerClass="flex flex-col items-stretch"
            >
              {movie.frames.map((frame: string, index: number) => (
                <div key={index} onClick={() => openImageModal(frame)}>
                  <img src={frame} alt={`Кадр ${index}`} />
                </div>
              ))}
            </Carousel>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={closeModal}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
