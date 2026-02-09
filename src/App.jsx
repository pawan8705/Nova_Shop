/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCart } from './context/CartContext'
import ScrollToTop from 'react-scroll-to-top'

// LAZY LOAD ALL PAGES - CRITICAL FOR PERFORMANCE
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const SingleProduct = lazy(() => import('./pages/SingleProduct'))
const CategoryProduct = lazy(() => import('./pages/CategoryProduct'))
const PolicyHub = lazy(() => import('./pages/PolicyHub'))

// Always load navbar and footer (needed on every page)
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Simple loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-[#155dfc] rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
    </div>
  </div>
)

const App = () => {
  const { cartItem, setCartItem } = useCart()

  // Load cart from local storage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route path='/category/:category' element={<CategoryProduct />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path='/policyHub' element={<PolicyHub />} />
        </Routes>
      </Suspense>
      <Footer />
      <ScrollToTop 
        color='white' 
        smooth 
        style={{
          backgroundColor:'#155dfc', 
          display:'flex', 
          alignItems:'center', 
          justifyContent:'center'
        }}
      />
    </BrowserRouter>
  )
}

export default App

