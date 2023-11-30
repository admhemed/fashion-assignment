// ImageGallery.tsx
import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  onImageClick?: () => void; // Event handler for image click
  altText: string;
  modal: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
  altText,
  modal,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [imageErrors, setImageErrors] = useState<{ [url: string]: boolean }>(
    {}
  );

  const handleImageError = (url: string) => {
    setImageErrors({ ...imageErrors, [url]: true });
  };

  return (
    <>
      <div
        onClick={onImageClick}
        className={`relative flex-shrink-0 w-full ${
          modal ? "h-[60vh]" : "h-56"
        } bg-gray-200`}
      >
        {/* Main image that triggers the modal */}
        {imageErrors[selectedImage] ? (
          <div className="image-error-placeholder">Image failed to load</div>
        ) : (
          <Image
            src={selectedImage}
            alt={altText}
            fill
            sizes="100%"
            style={{ objectFit: "contain" }}
            loading="lazy"
            className="p-2 bg-white"
            onError={() => handleImageError(selectedImage)}
          />
        )}
      </div>
      <div className="flex justify-center m-2 space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            className="focus:outline-none"
            onClick={() => setSelectedImage(image)}
          >
            {imageErrors[image] ? (
              <div className="thumbnail-error-placeholder">Error</div>
            ) : (
              // TODO: change static width and height to auto
              <div className="relative w-[35px] h-[45px]">
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1} for ${altText}`}
                  fill
                  sizes="100%"
                  loading="lazy"
                  className={`cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  onError={() => handleImageError(image)}
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
