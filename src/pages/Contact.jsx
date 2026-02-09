import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cfd9df] to-[#e2ebf0] dark:from-[#111] dark:to-[#222] flex items-center justify-center px-4 py-14">
      
      {/* Main Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-6xl p-6 border shadow-2xl backdrop-blur-xl bg-white/40 dark:bg-black/40 border-white/20 dark:border-white/10 rounded-3xl sm:p-10"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-[#273f4f] dark:text-white"
        >
          Get in Touch with{" "}
          <span className="text-[#155dfc]">
            NovaShop
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          
          {/* Info Section */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-6 text-[#273f4f] dark:text-gray-200"
          >
            <h3 className="text-2xl font-semibold">Contact Info</h3>
            <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
              Have a question or need support? We’d love to hear from you.
            </p>

            <div className="space-y-3 text-sm sm:text-base">
              <p>📍 <strong>Address:</strong> Khatima, Uttarakhand, India</p>
              <p>📧 <strong>Email:</strong> NeoElectronix123@gmail.com</p>
              <p>📞 <strong>Phone:</strong> +91 6396 096 431</p>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name.."
                className="w-full px-4 py-3 transition border border-gray-300 rounded-xl bg-white/70 dark:bg-white/10 dark:border-white/20 focus:outline-none focus:ring-2 dark:placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter Your Email..."
                className="w-full px-4 py-3 transition border border-gray-300 rounded-xl bg-white/70 dark:bg-white/10 dark:border-white/20 focus:outline-none focus:ring-2 dark:placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium dark:text-white">
                Your Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-4 py-3 transition border border-gray-300 rounded-xl bg-white/70 dark:bg-white/10 dark:border-white/20 focus:outline-none focus:ring-2 dark:placeholder:text-white/50"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#155dfc]"
            >
              Send Message 🚀
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;