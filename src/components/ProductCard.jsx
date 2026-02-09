import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star, TrendingUp } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Calculate discount
  const discountPercentage = product.discountPercentage || 0;
  const originalPrice = discountPercentage > 0 
    ? Math.round(product.price / (1 - discountPercentage / 100))
    : null;

  return (
    <div
      className="
        group relative h-full
        bg-white dark:bg-[#111]
        rounded-xl sm:rounded-2xl overflow-hidden
        shadow-md hover:shadow-2xl
        transition-all duration-300
        border border-gray-200 dark:border-gray-800
        hover:-translate-y-1 sm:hover:-translate-y-2
      "
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1.5 sm:gap-2">
        {discountPercentage > 0 && (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#155dfc] text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1">
            <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {Math.round(discountPercentage)}% OFF
          </span>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-orange-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
            Only {product.stock} left!
          </span>
        )}
      </div>

      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-gray-100 cursor-pointer aspect-square dark:bg-gray-900"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100" />

        {/* Quick View Button (appears on hover - hidden on mobile) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/products/${product.id}`);
          }}
          className="
            absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs sm:text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hidden sm:block
          "
        >
          Quick View
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col p-3 sm:p-4">
        {/* Category & Brand */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
          {product.brand && (
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
              {product.brand}
            </span>
          )}
          <span className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => navigate(`/products/${product.id}`)}
          className="
            text-sm sm:text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-1.5 sm:mb-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors min-h-[2.5rem] sm:min-h-[3rem]
          "
        >
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-300 text-gray-300 dark:fill-gray-700 dark:text-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-4 mt-auto">
          <p className="text-xl sm:text-2xl font-black text-[#155dfc]">
            ${product.price}
          </p>
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through sm:text-sm dark:text-gray-600">
              ${originalPrice}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={product.stock === 0}
          className={`
            w-full
            flex items-center justify-center gap-1.5 sm:gap-2
            rounded-lg sm:rounded-xl 
            py-2 sm:py-3 px-3 sm:px-4
            text-xs sm:text-sm font-bold cursor-pointer
            transition-all duration-200
            ${product.stock === 0
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-[#155dfc] hover:bg-[#155efc93] text-white shadow-lg hover:shadow-xl active:scale-95'
            }
          `}
        >
          <IoCartOutline className="text-lg sm:text-xl" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;