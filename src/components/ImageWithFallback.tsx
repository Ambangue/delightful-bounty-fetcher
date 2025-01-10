import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1504893524553-b855bce32c67", 
  className = ""
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      className={className}
    />
  );
};

export default ImageWithFallback;