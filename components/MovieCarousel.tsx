import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

interface MovieCarouselProps {
  frames: string[];
  onClose: () => void;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ frames, onClose }) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomedFrameIndex, setZoomedFrameIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setZoomedFrameIndex(index);
    setIsImageZoomed(true);
  };

  const handleImageClose = () => {
    setIsImageZoomed(false);
  };

  return (
    <div>
      <h3>Кадры из фильма:</h3>
      <div>
        <Carousel>
          {frames.map((frame, index) => (
            <div key={index}>
              <img
                src={frame}
                alt={`Кадр ${index}`}
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <button onClick={onClose}>Закрыть</button>

      {isImageZoomed && (
        <div onClick={handleImageClose}>
          <Image
            src={frames[zoomedFrameIndex]}
            alt={`Увеличенный кадр ${zoomedFrameIndex}`}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
