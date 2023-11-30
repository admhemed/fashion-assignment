// ProductItem.tsx
import React, { useState } from "react";
import { Product } from "../types/Product";
import Modal from "./Modal"; // Ensure this import points to your Modal component file
import ImageGallery from "./ImageGallery"; // Ensure this import points to your ImageGallery component file

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const hasReducedPrice = typeof product.priceR === "number";
  // Function to display available sizes
  const renderSizes = () => (
    <div className="my-2">
      <span className="text-xs text-gray-600 ">Available Sizes:</span>
      <div className="flex mt-1 space-x-2">
        {product.sizes.map((size) => (
          <span key={size} className="px-2 py-1 text-xs border rounded">
            {size}
          </span>
        ))}
      </div>
    </div>
  );

  // Function to open the modal
  const openQuickView = () => setIsQuickViewOpen(true);

  // Function to close the modal
  const closeQuickView = () => setIsQuickViewOpen(false);

  return (
    <article className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md group">
      <div className="cursor-pointer">
        <ImageGallery
          images={product.images}
          onImageClick={() => setIsQuickViewOpen(true)}
          altText={`${product.brand} - ${product.description}`}
          modal={false}
        />
      </div>
      {/* Other content like product description, price, etc. */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-800">
          {product.description}
        </h3>

        <div className="flex items-center justify-start font-semibold ">
          <p className="mr-2 text-lg font-bold">
            {hasReducedPrice
              ? `$${product.priceR!.toFixed(2)}`
              : `$${product.priceO.toFixed(2)}`}
          </p>
          {hasReducedPrice && (
            <p className="text-sm text-gray-500 line-through">{`$${product.priceO.toFixed(
              2
            )}`}</p>
          )}
        </div>
        {renderSizes()}
        <button
          onClick={() => openQuickView()}
          className="px-4 py-2 mt-4 text-white transition duration-300 ease-in-out transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none hover:-translate-y-1"
        >
          Add to Cart
        </button>
      </div>
      {/* Modal for Quick View */}
      {isQuickViewOpen && (
        <Modal isOpen={isQuickViewOpen} onClose={closeQuickView}>
          <ImageGallery
            images={product.images}
            altText={`${product.brand} - ${product.description}`}
            modal
          />
          {/* You can add more detailed information about the product here */}
          <div className="text-lg font-bold text-blue-800">
            {product.description}
          </div>

          <div className="font-semibold text-gray-600">
            {product.priceO.toFixed(2)}
          </div>

          {renderSizes()}
          <button
            onClick={() => {
              closeQuickView();
            }}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Add to Cart
          </button>
        </Modal>
      )}
    </article>
  );
};

export default React.memo(ProductItem);
