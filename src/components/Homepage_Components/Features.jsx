import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

/* Animation Variants */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Features = () => {
  return (
    <section className="bg-[#efeeea] dark:bg-[#080d10] py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8 sm:mb-10 md:mb-12 text-3xl font-extrabold  md:text-4xl text-center text-black dark:text-white px-4"
      >
        Why Shop{" "}
        <span className="text-[#155dfc]">With Us</span>
      </motion.h2>

      <motion.div
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-[#7daaf41d] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-[50px]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 border border-[#155dfc] transition-colors bg-transparent rounded-xl sm:rounded-2xl hover:bg-black/5 dark:hover:bg-white/5"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#155dfc]/10 flex items-center justify-center"
                >
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-[#155dfc]"
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-black dark:text-[#d6fff1] truncate">
                    {feature.text}
                  </p>
                  <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 dark:text-[#7eaccb] line-clamp-2">
                    {feature.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;