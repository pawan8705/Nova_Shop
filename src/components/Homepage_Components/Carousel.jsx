/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FiShoppingBag, FiStar, FiTrendingUp } from "react-icons/fi";
import Banner1 from "../../assets/Banner1.jpg";

const Carousel = () => {

  return (
    <section className="w-full overflow-hidden bg-gradient-to-r from-[#f8f6f1] to-[#efece5] dark:from-[#0f0f0f] dark:to-[#1a1a1a] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#155dfc]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full -bottom-20 -left-20 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 px-4 py-12 mx-auto max-w-7xl md:py-16 lg:py-20">

        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 md:gap-12 lg:gap-16">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[#155dfc] to-[#4f87ff] text-white shadow-lg shadow-[#155dfc]/30"
            >
              <FiTrendingUp className="animate-pulse" />
              New Collection 2026 🚀
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Elevate Your <br />
              <span className="bg-gradient-to-r from-[#155dfc] to-[#4f87ff] bg-clip-text text-transparent">
                Shopping Experience
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-lg text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300"
            >
              Premium products, smooth checkout, lightning fast delivery.
              Designed for modern shoppers who value quality and speed.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <button className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#155dfc] to-[#4f87ff] text-white font-semibold overflow-hidden shadow-xl shadow-[#155dfc]/30 hover:shadow-2xl hover:shadow-[#155dfc]/40 transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  <FiShoppingBag />
                  Shop Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4f87ff] to-[#155dfc] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-[#155dfc] transition-all duration-300 hover:scale-105 active:scale-95">
                Explore Deals
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-10"
            >
              {[
                { label: "Products", value: "10K+" },
                { label: "Customers", value: "50K+" },
                { label: "Rating", value: "4.9⭐" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#155dfc]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            {/* Main Image Container */}
            <div className="relative group">
              {/* Glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-5 bg-gradient-to-tr from-[#155dfc] via-pink-500 to-orange-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
              
              {/* Image */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/10"
              >
                <img 
                  src={Banner1} 
                  alt="Shopping Banner"
                  className="object-cover object-center w-full h-full"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100" />
              </motion.div>

              {/* Floating badge - Fast Delivery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-2 left-2 bg-[#000e2c] px-4 py-2 rounded-2xl shadow-2xl border border-[#00091b] backdrop-blur-sm"
              >
                <div>
                  <p className="flex items-center text-sm text-white">
                    ⚡ Fast Delivery
                  </p>
                  <span className="text-xs text-gray-300">
                    All over India
                  </span>
                </div>
              </motion.div>

              {/* Floating badge - Top Rated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="absolute px-5 py-3 shadow-2xl top-2 right-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <FiStar className="text-white" size={20} />
                  <span className="text-lg font-bold text-white">4.9</span>
                </motion.div>
              </motion.div>

              {/* Floating shapes */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 -right-8 w-16 h-16 bg-[#155dfc]/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-20 h-20 rounded-full bottom-20 -left-8 bg-pink-500/20 dark:bg-pink-500/10 blur-xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Carousel;