/* eslint-disable no-unused-vars */
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useUser } from '@clerk/clerk-react'


/* ================= NAV ITEMS ================= */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "PolicyHub", path: "/policyHub" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { cartItem = [] } = useCart();
  const location = useLocation();
  const { isSignedIn } = useUser(); 

  const [openNav, setOpenNav] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const navRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    left: 0,
  });

  /* ================= Scroll Progress ================= */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  /* ================= Route change ================= */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenNav(false);
    const index = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  /* ================= Indicator ================= */
  useEffect(() => {
    if (navRef.current[activeIndex]) {
      setIndicatorStyle({
        width: navRef.current[activeIndex].offsetWidth,
        left: navRef.current[activeIndex].offsetLeft,
      });
    }
  }, [activeIndex]);

  /* ================= Dark Mode ================= */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);


    // Cart click handler
  const handleCartClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault();
      alert('🔒 Please sign up or sign in first to access your cart!');
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className="fixed top-0 left-0 w-full z-50
        bg-[#fff] dark:bg-[#000000] backdrop-blur-xl
        shadow-md transition-colors"
      >
        <div className="max-w-6xl mx-auto h-[72px] px-4 flex items-center justify-between text-[#292524] dark:text-[#fafaf9]">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-wide text-[#155dfc]">
            <span className="text-[#292524] dark:text-[#fafaf9] font-serif">
              Nova
            </span>
            Shop
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="relative hidden lg:flex">
            <ul className="flex gap-8 text-lg font-medium">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  ref={(el) => (navRef.current[index] = el)}
                  onClick={() => setActiveIndex(index)}
                  className="relative"
                >
                  <NavLink
                    to={item.path}
                    className="hover:text-[#155dfc] transition-colors"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Active underline */}
            <motion.div
              layout
              className="absolute -bottom-2 h-[3px] rounded-full bg-[#155dfc]"
              style={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>

          {/* ===== Right Section ===== */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              onClick={handleCartClick}
              className="relative"
            >
              <IoCartOutline size={26} />
              <span className="absolute -top-2 -right-2 bg-[#155dfc] text-white text-xs px-2 rounded-full">
                {cartItem.length}
              </span>
            </Link>

            {/* Theme */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-[#155dfc] text-[#fff] transition-colors hidden lg:block"
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            {/* Auth Desktop */}
            <div className="hidden lg:block">
              <SignedOut>
                <SignInButton className="bg-[#155dfc] text-[#fff] px-4 py-1 rounded-md" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden dark:text-[#fff]">
              {openNav ? (
                <HiMenuAlt3 size={26} onClick={() => setOpenNav(false)} />
              ) : (
                <HiMenuAlt1 size={26} onClick={() => setOpenNav(true)} />
              )}
            </div>
          </div>
        </div>

        {/* ===== Scroll Progress Bar (BOTTOM) ===== */}
        <motion.div
          style={{ scaleX }}
          className="h-[3px] w-full origin-left bg-[#155dfc]"
        />
      </header>

      {/* Spacer */}
      <div className="h-[75px]" />

      {/* ================= MOBILE SIDEBAR ================= */}
    <AnimatePresence>
      {openNav && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenNav(false)}
          />
    
          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%", scale: 0.95 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: "100%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="fixed top-0 right-0 h-screen w-[88%] max-w-sm
            bg-white/95 dark:bg-black/95 backdrop-blur-xl
            z-50 shadow-2xl flex flex-col"
          >
            {/* ===== HEADER ===== */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-black/10 dark:border-white/10">
              <h2 className="text-[#155dfc] text-xl font-extrabold tracking-wide">
                <span className="text-[#1f2937] dark:text-[#fafaf9]">Nova</span>
                Shop
              </h2>

                              
              <SignedOut>
                <SignInButton className="w-[35%] bg-[#155dfc] text-white py-3 rounded-xl text-md font-medium" />
              </SignedOut>
    
              <SignedIn>
                <UserButton />
              </SignedIn>
    
              {/* Close Button */}
              <motion.button
                whileTap={{ scale: 0.9, rotate: 90 }}
                onClick={() => setOpenNav(false)}
                className="h-10 w-10 rounded-full
                bg-[#155dfc] text-[#fafaf9]
                flex items-center justify-center"
              >
                <HiMenuAlt3 size={22} />
              </motion.button>
            </div>
    
            {/* ===== NAV LINKS ===== */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex-1 px-6 py-8 space-y-4"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setOpenNav(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-lg font-medium text-[#155dfc] transition-all
                      ${
                        isActive
                          ? "bg-[#155dfc] text-[#fafaf9]"
                          : "hover:bg-[#155dfc]/10"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
    
            {/* ===== AUTH (BOTTOM FIXED) ===== */}
            <div className="flex flex-col gap-5 px-6 py-5 border-t border-black/10 dark:border-white/10">
    
            {/* Theme */}
    
           <button
             onClick={() => setDark(!dark)}
             className="rounded-full w-full border border-[#155dfc] text-[#155dfc] transition-colors w-full py-3 rounded-xl text-lg font-medium"
           >
             {dark ? <span>Light Mode</span> : <span>Dark Mode</span>}
           </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;