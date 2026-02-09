import { FaFilter } from 'react-icons/fa6'
import { getData } from '../context/DataContext'


const MobileFilter = ({ openFilter, setOpenFilter, search, setSearch, brand, setBrand, priceRange, setPriceRange, category, setCategory, handleBrandChange, handleCategoryChange }) => {
    const { categoryOnlyData, brandOnlyData } = getData()

    const toggleFilter = ()=>{
        setOpenFilter(!openFilter)
    }
    return (
        <>
            <div className='flex items-center justify-between p-2 px-4 mt-5 bg-gray-100 md:hidden'>
                <h1 className='text-xl font-semibold'>Filters</h1>
                <FaFilter onClick={toggleFilter} className='text-gray-800' />
            </div>
            {
                openFilter ? <div className='p-2 bg-gray-100 md:hidden'>
                    <input type="text"
                        placeholder='Search..'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full p-2 bg-white border-2 border-gray-400 rounded-md'
                    />
                    {/* category only data */}
                    <h1 className='mt-5 text-xl font-semibold'>Category</h1>
                    <div className='flex flex-col gap-2 mt-3'>
                        {
                            categoryOnlyData?.map((item, index) => {
                                return <div key={index} className='flex gap-2'>
                                    <input type="checkbox" name={item} checked={category === item} value={item} onChange={handleCategoryChange} />
                                    <button className='uppercase cursor-pointer'>{item}</button>
                                </div>
                            })
                        }
                    </div>
                    {/* brand only data */}
                    <h1 className='mt-5 mb-3 text-xl font-semibold'>Brand</h1>
                    <select name="" id=""
                        className='w-full p-2 bg-white border-2 border-gray-200 rounded-md '
                        value={brand}
                        onChange={handleBrandChange}
                    >
                        {
                            brandOnlyData?.map((item, index) => {
                                return <option key={index} value={item}>{item.toUpperCase()}</option>
                            })
                        }
                    </select>
                    {/* price range  */}
                    <h1 className='mt-5 mb-3 text-xl font-semibold'>Price Range</h1>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                        <input type="range" min="0" max="5000" name="" id="" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className='transition-all w-[200px]' />
                    </div>
                    <button className='px-3 py-1 mt-5 text-white bg-red-500 rounded-md cursor-pointer'
                        onClick={() => { setSearch(''); setCategory('All'); setBrand('All'); setPriceRange([0, 5000]); setOpenFilter(false) }}
                    >Reset Filters</button>
                </div> : null
            }
        </>
    )
}

export default MobileFilter