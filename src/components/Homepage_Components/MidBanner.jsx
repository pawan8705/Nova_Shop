// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Banner2 from "../../assets/Banner2.avif";
import { HiArrowRight } from "react-icons/hi2";

const MidBanner = () => {
  return (
    <section className="bg-[#eae4d5] dark:bg-[#060509] py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0b0f14] shadow-2xl "
        >
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block w-fit mb-4 px-4 py-1 text-xs font-semibold tracking-widest rounded-full bg-[#155dfc]/10 text-[#155dfc]"
            >
              TRENDING NOW
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold leading-tight text-black sm:text-4xl lg:text-5xl dark:text-white"
            >
              Smart Tech  
              <span className="block text-[#155dfc]">
                Built for the Future
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="max-w-md mt-5 text-sm text-gray-600 sm:text-base dark:text-gray-400"
            >
              Experience next-generation electronics with premium
              design, lightning performance and unbeatable value.
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-fit flex items-center gap-2 bg-[#155dfc] text-white font-semibold px-6 py-3 rounded-full shadow-lg"
            >
              Explore Products
              <HiArrowRight />
            </motion.button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              src={Banner2}
              alt="Mid Banner"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div/>            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MidBanner;