/* eslint-disable react-hooks/set-state-in-effect */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import { getData } from "../../context/DataContext";
import { HiChevronRight } from "react-icons/hi2";
import { BiCategory } from "react-icons/bi";

const Category = memo(() => {
  const navigate = useNavigate();
  const { data, fetchAllProducts } = getData();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAllProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    
    loadData();
  }, []);

  // Extract categories from data
  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueCategories = [...new Set(data.map((i) => i.category))];
      setCategories(uniqueCategories);
      setIsLoading(false);
    }
  }, [data]);

  // Sticky scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading skeleton
  if (isLoading || categories.length === 0) {
    return (
      <section className="sticky top-0 z-40 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="min-w-[140px] h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`sticky top-0 z-40 bg-white dark:bg-[#161616] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isSticky ? 'shadow-lg backdrop-blur-md bg-white/95 dark:bg-[#0a0a0a]/95' : 'shadow-sm'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
          
          {/* All Categories Button */}
          <button
            onClick={() => navigate('/products')}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#155dfc] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#155dfc]/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <BiCategory className="text-base" />
            <span className="hidden sm:inline">All</span>
          </button>

          {/* Category Pills */}
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => navigate(`/category/${cat}`)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#155dfc] text-gray-700 dark:text-gray-200 hover:text-white font-medium text-sm capitalize border border-transparent hover:border-[#155dfc] transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md group"
            >
              <span>{cat}</span>
              <HiChevronRight className="text-xs transition-opacity opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});

Category.displayName = 'Category';

export default Category;
