import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      
      // DummyJSON Single Product API
      const res = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      
      console.log("Single Product:", res.data);
      setSingleProduct(res.data);
      setLoading(false);
      
    } catch (error) {
      console.log("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getSingleProduct();
  }, [params.id]); // Add Dependency 

  if (loading || !singleProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video muted autoPlay loop className="w-32">
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  // Set discountPercentage in DummyJSON field
  const discountPercentage = singleProduct.discountPercentage || 0;
  const originalPrice = Math.round(
    singleProduct.price / (1 - discountPercentage / 100)
  );

  return (
    <div className="dark:bg-[#222222] bg-gray-50 pb-10">
      <Breadcrums title={singleProduct.title} />

      <div className="max-w-6xl px-4 mx-auto md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#efeeea] dark:bg-[#000] rounded-3xl p-6 md:p-10 shadow-lg"
        >
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center"
          >
            <img
              src={singleProduct.thumbnail}
              alt={singleProduct.title}
              className="object-cover w-full max-w-md transition-transform duration-300 shadow-md aspect-square rounded-2xl hover:scale-105"
            />
          </motion.div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl md:text-3xl font-bold text-[#155dfc]">
              {singleProduct.title}
            </h1>

            <p className="text-sm tracking-wide text-gray-600 uppercase dark:text-gray-400">
              {singleProduct.brand || 'No Brand'} • {singleProduct.category}
              {singleProduct.model && ` • ${singleProduct.model}`}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-[#155dfc]">
                ${singleProduct.price}
              </span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-[#155dfc] text-white dark:text-black">
                    {Math.round(discountPercentage)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* RATING */}
            {singleProduct.rating && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-yellow-500">★</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {singleProduct.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({singleProduct.reviews?.length || 0} reviews)
                </span>
              </div>
            )}

            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {singleProduct.description}
            </p>

            {/* STOCK INFO */}
            {singleProduct.stock !== undefined && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  Stock:
                </span>
                <span className={`font-semibold ${
                  singleProduct.stock > 10 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {singleProduct.stock > 0 ? `${singleProduct.stock} available` : 'Out of stock'}
                </span>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Quantity
              </span>
              <input
                type="number"
                min={1}
                max={singleProduct.stock || 99}
                defaultValue={1}
                className="w-20 rounded-lg border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#155dfc] dark:bg-[#111] dark:text-[#155dfc]"
              />
            </div>

            {/* ACTION */}
            <button
              onClick={() => addToCart(singleProduct)}
              disabled={singleProduct.stock === 0}
              className={`mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold transition-all ${
                singleProduct.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#155dfc] hover:bg-[#155efc81] hover:scale-[1.02]'
              } text-white dark:text-black`}
            >
              <IoCartOutline className="w-6 h-6" />
              {singleProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProduct;