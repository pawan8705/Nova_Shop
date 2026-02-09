import { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from "../assets/Loading4.webm"
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"
import MobileFilter from '../components/MobileFilter'
import Category from '../components/Homepage_Components/Category'

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0, 0)
  }

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]
  )
  
  const dynamicPage = Math.ceil(filteredData?.length / 8)

  return (
    <div className='min-h-screen dark:bg-[#222222]'>
      <Category />
      
      <div className='w-full max-w-7xl mx-auto dark:bg-[#222222] px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12'>
        {/* Mobile Filter Component */}
        <MobileFilter 
          openFilter={openFilter} 
          setOpenFilter={setOpenFilter} 
          search={search} 
          setSearch={setSearch} 
          brand={brand} 
          setBrand={setBrand} 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          category={category} 
          setCategory={setCategory} 
          handleCategoryChange={handleCategoryChange} 
          handleBrandChange={handleBrandChange}
        />

        {data?.length > 0 ? (
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8'>
            {/* Desktop Filter Section - Hidden on mobile */}
            <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
              <FilterSection 
                search={search} 
                setSearch={setSearch} 
                brand={brand} 
                setBrand={setBrand} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                category={category} 
                setCategory={setCategory} 
                handleCategoryChange={handleCategoryChange} 
                handleBrandChange={handleBrandChange} 
              />
            </div>

            {/* Products Grid Section */}
            <div className='flex-1 w-full'>
              {filteredData?.length > 0 ? (
                <div className='flex flex-col items-center w-full'>
                  {/* Products Grid - Responsive columns */}
                  <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-4 sm:mt-6 lg:mt-10'>
                    {filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => (
                      <ProductCard key={product.id || index} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="w-full mt-6 sm:mt-8 lg:mt-10">
                    <Pagination 
                      pageHandler={pageHandler} 
                      page={page} 
                      dynamicPage={dynamicPage} 
                    />
                  </div>
                </div>
              ) : (
                // No results found
                <div className='flex justify-center items-center w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-4 sm:mt-6 lg:mt-10'>
                  <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
                    <Lottie animationData={notfound} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Loading state
          <div className='flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] w-full'>
            <video 
              muted 
              autoPlay 
              loop 
              className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
            >
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
