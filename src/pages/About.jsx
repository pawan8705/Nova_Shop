import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#111] dark:to-[#222] py-14 px-4 sm:px-6 lg:px-20">
      
      {/* Main Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-6xl p-6 mx-auto space-y-10 border shadow-2xl backdrop-blur-xl bg-white/70 dark:bg-black/50 rounded-3xl sm:p-10 border-white/20 dark:border-white/10"
      >
        {/* Title */}
        <motion.h1
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold text-center sm:text-4xl lg:text-5xl"
        >
          <span className="text-[#000] dark:text-[white]">
            About <span className="text-[#155dfc]">NovaShop</span>
          </span>
        </motion.h1>

        {/* Intro */}
        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-base leading-relaxed text-center text-gray-700 sm:text-lg dark:text-gray-300"
        >
          Welcome to{" "}
          <span className="font-semibold text-[#155dfc]">
            NovaShop
          </span>
          , your one-stop destination for the latest and greatest in electronics.
          From cutting-edge gadgets to must-have accessories, we power up your
          tech life with premium products and unbeatable service.
        </motion.p>

        {/* Sections */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Mission */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="p-6 shadow-md bg-white/60 dark:bg-white/5 rounded-2xl"
          >
            <h2 className="text-2xl font-semibold mb-3 text-[#155dfc]">
              Our Mission
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
              Our mission is to make innovative technology accessible to
              everyone. We connect people with tools they need to thrive in a
              digital world — at competitive prices, delivered with care.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="p-6 shadow-md bg-white/60 dark:bg-white/5 rounded-2xl"
          >
            <h2 className="text-2xl font-semibold mb-3 text-[#155dfc]">
              Our Vision
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 sm:text-base">
              We envision a future where technology elevates everyday life.
              NovaShop stays ahead of the curve with practical, modern and
              affordable tech solutions.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.5 }}
          className="p-6 shadow-md bg-white/60 dark:bg-white/5 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#155dfc]">
            Why Choose NovaShop?
          </h2>
          <ul className="pl-6 space-y-2 text-sm text-gray-700 list-disc dark:text-gray-300 sm:text-base">
            <li>Top-quality electronic products from trusted brands</li>
            <li>Lightning-fast and secure shipping</li>
            <li>Reliable and friendly customer support</li>
            <li>Easy returns & hassle-free shopping experience</li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="pt-6 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#155dfc] mb-2">
            Join the NovaShop Family
          </h3>
          <p className="mb-6 text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            Whether you’re a tech enthusiast or just exploring — NovaShop
            has something for everyone.
          </p>

          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-semibold text-white dark:text-black bg-[#155dfc] shadow-lg"
            >
              Start Shopping 🚀
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;