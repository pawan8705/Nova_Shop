import { useCart } from '../context/CartContext'
import { FaRegTrashAlt, FaShippingFast, FaLock } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining, MdLocalOffer } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { AiOutlinePercentage } from 'react-icons/ai';
import { BiTimer } from 'react-icons/bi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import emptyCart from "../assets/empty-cart.png"

const Cart = () => {
  const { cartItem = [], updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()
  
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [timeLeft, setTimeLeft] = useState(600)
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [deliveryInfoSaved, setDeliveryInfoSaved] = useState(false)

  // Timer effect
  useEffect(() => {
    if (cartItem.length === 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [cartItem.length])

  // Load saved delivery info from localStorage
  useEffect(() => {
    const savedInfo = localStorage.getItem('deliveryInfo')
    if (savedInfo) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(JSON.parse(savedInfo))
      setDeliveryInfoSaved(true)
    }
  }, [])

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate totals
  const itemsTotal = cartItem.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1))
  }, 0)
  
  const deliveryCharge = itemsTotal >= 100 ? 0 : 25
  const handlingCharge = 5
  const tax = itemsTotal * 0.10
  const discount = appliedPromo?.discount || 0
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge + tax - discount

  // Promo codes
  const promoCodes = [
    { code: 'SAVE10', discount: 10, description: '$10 Off' },
    { code: 'SAVE20', discount: 20, description: '$20 Off on $200+', minOrder: 200 },
    { code: 'FIRST15', discount: 15, description: '15% Off First Order', isPercentage: true }
  ]

  // Apply promo
  const handleApplyPromo = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase())
    
    if (!promo) {
      alert('❌ Invalid promo code')
      return
    }
    
    if (promo.minOrder && itemsTotal < promo.minOrder) {
      alert(`❌ Minimum order of $${promo.minOrder} required`)
      return
    }
    
    const discountAmount = promo.isPercentage 
      ? itemsTotal * (promo.discount / 100)
      : promo.discount
    
    setAppliedPromo({ ...promo, discount: discountAmount })
    alert(`✅ Promo applied! You saved $${discountAmount.toFixed(2)}`)
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode('')
  }

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' })
    }
    setDeliveryInfoSaved(false)
  }

  // Validate delivery form
  const validateDeliveryForm = () => {
    const errors = {}
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required'
    } else if (formData.phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits'
    }
    
    if (!formData.address) {
      errors.address = 'Address is required'
    }
    
    if (!formData.city) {
      errors.city = 'City is required'
    }
    
    if (!formData.zipCode) {
      errors.zipCode = 'ZIP code is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Submit delivery info
  const handleSubmitDeliveryInfo = (e) => {
    e.preventDefault()
    
    if (validateDeliveryForm()) {
      localStorage.setItem('deliveryInfo', JSON.stringify(formData))
      setDeliveryInfoSaved(true)
      alert('✅ Delivery information saved successfully!')
    } else {
      alert('❌ Please fill all required fields correctly')
    }
  }

  // Clear delivery info
  const handleClearDeliveryInfo = () => {
    setFormData({
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    })
    setFormErrors({})
    setDeliveryInfoSaved(false)
    localStorage.removeItem('deliveryInfo')
  }

  // Checkout
  const handleCheckout = () => {
    if (!deliveryInfoSaved) {
      alert('❌ Please save your delivery information first')
      return
    }
    
    const orderData = {
      items: cartItem,
      delivery: formData,
      billing: {
        itemsTotal,
        deliveryCharge,
        handlingCharge,
        tax,
        discount,
        grandTotal
      },
      promo: appliedPromo,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress
    }
    
    console.log('Order Data:', orderData)
    alert('🎉 Order placed successfully! Check console for order details.')
  }

  return (
    <div className='min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 bg-gray-50 dark:bg-[#0f0f0f]'>
      <div className='mx-auto max-w-7xl'>
        {cartItem.length > 0 ? (
          <div>
            {/* Header */}
            <div className='mb-4 sm:mb-6'>
              <div className='flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
                <div>
                  <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl text-[#155dfc]'>
                    Shopping Cart
                  </h1>
                  <p className='mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400'>
                    {cartItem.length} {cartItem.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/products')}
                  className='w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg border-2 border-[#155dfc] text-[#155dfc] font-semibold hover:bg-[#155efca8] hover:text-white dark:hover:text-black transition-all text-sm sm:text-base'
                >
                  Continue Shopping
                </button>
              </div>

              {/* Timer Banner */}
              {timeLeft > 0 && (
                <div className='flex flex-col items-start justify-between gap-3 p-3 text-white rounded-lg bg-gradient-to-r from-orange-500 to-red-500 dark:from-green-500 dark:to-teal-500 sm:rounded-xl sm:p-4 sm:flex-row sm:items-center sm:gap-0'>
                  <div className='flex items-center gap-2 sm:gap-3'>
                    <BiTimer className='flex-shrink-0 text-xl sm:text-2xl' />
                    <div>
                      <p className='text-sm font-bold sm:text-base'>Limited Time Offer!</p>
                      <p className='text-xs sm:text-sm opacity-90'>Complete checkout soon</p>
                    </div>
                  </div>
                  <div className='bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg self-end sm:self-auto'>
                    <p className='font-mono text-lg font-bold sm:text-xl'>{formatTime(timeLeft)}</p>
                  </div>
                </div>
              )}

              {/* Free Shipping Bar */}
              {itemsTotal < 100 && (
                <div className='mt-3 sm:mt-4 bg-white dark:bg-[#1a1a1a] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-[#2a2a2a]'>
                  <p className='mb-2 text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                    <FaShippingFast className='inline mr-1 sm:mr-2 text-[#155dfc]' />
                    Add <span className='font-bold text-[#155dfc]'>
                      ${(100 - itemsTotal).toFixed(2)}
                    </span> more for FREE shipping!
                  </p>
                  <div className='w-full bg-gray-200 dark:bg-[#2a2a2a] rounded-full h-2'>
                    <div 
                      className='bg-gradient-to-r from-[#155dfc] to-[#22ffff] h-2 rounded-full transition-all duration-500'
                      style={{ width: `${Math.min((itemsTotal / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-6'>
              {/* Cart Items */}
              <div className='space-y-3 lg:col-span-2 sm:space-y-4'>
                <AnimatePresence mode='popLayout'>
                  {cartItem.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className='bg-white dark:bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-md border border-gray-100 dark:border-[#2a2a2a]'
                    >
                      <div className='flex gap-3 sm:gap-4'>
                        {/* Image */}
                        <div 
                          onClick={() => navigate(`/products/${item.id}`)}
                          className='flex-shrink-0 cursor-pointer'
                        >
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className='object-cover w-16 h-16 rounded-lg sm:w-20 sm:h-20 md:w-28 md:h-28 sm:rounded-xl' 
                          />
                        </div>

                        {/* Details */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex justify-between gap-2 mb-2'>
                            <h3 
                              onClick={() => navigate(`/products/${item.id}`)}
                              className='font-semibold text-gray-800 dark:text-white line-clamp-2 text-xs sm:text-sm md:text-base cursor-pointer hover:text-[#155dfc] transition-colors'
                            >
                              {item.title}
                            </h3>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className='flex items-center justify-center flex-shrink-0 transition-colors rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40'
                            >
                              <FaRegTrashAlt className='text-xs text-red-500 sm:text-sm' />
                            </button>
                          </div>

                          <p className='text-[#155dfc] font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3'>
                            ${item.price?.toFixed(2) || 0}
                          </p>

                          {/* Quantity */}
                          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
                            <div className='flex items-center gap-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg p-1 w-fit'>
                              <button
                                onClick={() => updateQuantity(cartItem, item.id, "decrease")}
                                disabled={(item.quantity || 1) <= 1}
                                className='w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white dark:bg-[#1a1a1a] text-[#155dfc] font-bold hover:bg-[#155efc9e] hover:text-white dark:hover:text-black transition-all disabled:opacity-50 text-sm sm:text-base'
                              >
                                -
                              </button>
                              <span className='w-8 text-sm font-semibold text-center sm:w-10 dark:text-white sm:text-base'>
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem, item.id, "increase")}
                                className='w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white dark:bg-[#1a1a1a] text-[#155dfc] font-bold hover:bg-[#155efc91] hover:text-white dark:hover:text-black transition-all text-sm sm:text-base'
                              >
                                +
                              </button>
                            </div>
                            
                            <span className='text-xs text-gray-600 sm:text-sm dark:text-gray-400'>
                              Subtotal: <span className='font-semibold text-gray-800 dark:text-white'>
                                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sidebar */}
              <div className='space-y-4 sm:space-y-6 lg:sticky lg:top-24 lg:self-start'>
                {/* Available Offers */}
                <div className='bg-gradient-to-br from-orange-50 to-red-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-dashed border-[#155dfc]'>
                  <h3 className='flex items-center gap-2 mb-3 text-sm font-bold text-gray-800 dark:text-white sm:text-base'>
                    <MdLocalOffer className='text-[#155dfc]' />
                    Available Offers
                  </h3>
                  <div className='space-y-2'>
                    {promoCodes.map((promo) => (
                      <div key={promo.code} className='flex items-center justify-between gap-2 text-xs sm:text-sm'>
                        <div className='flex-1 min-w-0'>
                          <span className='font-mono font-bold text-[#155dfc] block truncate'>
                            {promo.code}
                          </span>
                          <p className='text-xs text-gray-600 truncate dark:text-gray-400'>
                            {promo.description}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setPromoCode(promo.code)
                            setTimeout(() => {
                              const p = promoCodes.find(pc => pc.code === promo.code)
                              if (p.minOrder && itemsTotal < p.minOrder) {
                                alert(`❌ Minimum order of $${p.minOrder} required`)
                                return
                              }
                              const discountAmount = p.isPercentage 
                                ? itemsTotal * (p.discount / 100)
                                : p.discount
                              setAppliedPromo({ ...p, discount: discountAmount })
                            }, 100)
                          }}
                          className='text-xs px-2 sm:px-3 py-1 bg-white dark:bg-[#1a1a1a] rounded-md font-semibold text-[#155dfc] hover:bg-[#155efc8e] hover:text-white dark:hover:text-black transition-all flex-shrink-0 whitespace-nowrap'
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill Summary */}
                <div className='bg-white dark:bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-[#2a2a2a]'>
                  <h2 className='flex items-center gap-2 mb-4 text-lg font-bold text-gray-800 sm:text-xl dark:text-white sm:mb-6'>
                    <GiShoppingBag className='text-[#155dfc]' />
                    Order Summary
                  </h2>

                  <div className='space-y-3 sm:space-y-4'>
                    <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 sm:text-base'>
                      <span className='flex items-center gap-2'>
                        <LuNotebookText className='text-[#155dfc] flex-shrink-0' />
                        <span className='truncate'>Items ({cartItem.length})</span>
                      </span>
                      <span className='flex-shrink-0 font-semibold'>${itemsTotal.toFixed(2)}</span>
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 sm:text-base'>
                      <span className='flex items-center gap-2'>
                        <MdDeliveryDining className='text-[#155dfc] flex-shrink-0' />
                        <span className='truncate'>Delivery</span>
                      </span>
                      {deliveryCharge === 0 ? (
                        <span className='flex-shrink-0 text-xs font-semibold text-green-600 sm:text-base'>
                          <span className='mr-1 text-gray-400 line-through sm:mr-2'>$25</span>
                          FREE
                        </span>
                      ) : (
                        <span className='flex-shrink-0 font-semibold'>${deliveryCharge}</span>
                      )}
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 sm:text-base'>
                      <span className='flex items-center gap-2'>
                        <GiShoppingBag className='text-[#155dfc] flex-shrink-0' />
                        <span className='truncate'>Handling</span>
                      </span>
                      <span className='flex-shrink-0 font-semibold'>${handlingCharge}</span>
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 sm:text-base'>
                      <span className='flex items-center gap-2'>
                        <AiOutlinePercentage className='text-[#155dfc] flex-shrink-0' />
                        <span className='truncate'>Tax (10%)</span>
                      </span>
                      <span className='flex-shrink-0 font-semibold'>${tax.toFixed(2)}</span>
                    </div>

                    {appliedPromo && (
                      <div className='flex items-center justify-between p-2 text-xs text-green-600 rounded-lg dark:text-green-400 bg-green-50 dark:bg-green-900/20 sm:p-3 sm:text-sm'>
                        <span className='flex items-center gap-2 font-semibold truncate'>
                          <IoCheckmarkCircle className='flex-shrink-0' />
                          <span className='truncate'>{appliedPromo.code}</span>
                        </span>
                        <div className='flex items-center flex-shrink-0 gap-2'>
                          <span className='font-bold'>-${appliedPromo.discount.toFixed(2)}</span>
                          <button onClick={handleRemovePromo} className='text-red-500'>
                            <IoClose size={18} />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className='border-t border-gray-200 dark:border-[#2a2a2a] pt-3 sm:pt-4'>
                      <div className='flex items-center justify-between'>
                        <span className='text-base font-bold text-gray-800 sm:text-lg dark:text-white'>
                          Total
                        </span>
                        <span className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
                          ${grandTotal.toFixed(2)}
                        </span>
                      </div>
                      {appliedPromo && (
                        <p className='mt-1 text-xs text-right text-green-600'>
                          You saved ${appliedPromo.discount.toFixed(2)}!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Promo Input */}
                  <div className='mt-4 sm:mt-6'>
                    <h3 className='mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 sm:mb-3 sm:text-base'>
                      Have a Promo Code?
                    </h3>
                    <div className='flex gap-2'>
                      <input 
                        type="text" 
                        placeholder='Enter code' 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        disabled={!!appliedPromo}
                        className='flex-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none disabled:opacity-50 uppercase text-sm sm:text-base'
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={!!appliedPromo || !promoCode}
                        className='px-4 sm:px-6 py-2 bg-[#155dfc] text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap'
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout */}
                  <button
                    onClick={handleCheckout}
                    disabled={!deliveryInfoSaved}
                    className='w-full mt-4 sm:mt-6 bg-gradient-to-r from-[#155dfc] to-[#22edff] text-white dark:text-black font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
                  >
                    <FaLock />
                    <span className='truncate'>
                      {deliveryInfoSaved ? 'Secure Checkout' : 'Save Delivery Info First'}
                    </span>
                  </button>

                  <div className='flex items-center justify-center gap-3 mt-3 text-xs text-gray-500 sm:mt-4 sm:gap-4 dark:text-gray-400'>
                    <div className='flex items-center gap-1'>
                      <FaLock className='text-green-600' />
                      <span>Secure</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <FaShippingFast className='text-blue-600' />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Form */}
                <div className='bg-white dark:bg-[#1a1a1a] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-[#2a2a2a]'>
                  <div className='flex items-center justify-between mb-4 sm:mb-6'>
                    <h2 className='text-lg font-bold text-gray-800 sm:text-xl dark:text-white'>
                      Delivery Info
                    </h2>
                    {deliveryInfoSaved && (
                      <span className='flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 sm:text-sm'>
                        <IoCheckmarkCircle />
                        <span className='hidden sm:inline'>Saved</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSubmitDeliveryInfo} className='space-y-3 sm:space-y-4'>
                    <div>
                      <label className='block mb-1 text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300 sm:mb-2'>
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        value={user?.fullName || ''}
                        readOnly
                        className='w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-white text-sm sm:text-base'
                      />
                    </div>

                    <div>
                      <label className='block mb-1 text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300 sm:mb-2'>
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder='Enter phone number'
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-[#2a2a2a]'} bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm sm:text-base`}
                      />
                      {formErrors.phone && (
                        <p className='mt-1 text-xs text-red-500'>{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className='block mb-1 text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300 sm:mb-2'>
                        Street Address *
                      </label>
                      <textarea 
                        name="address"
                        rows="2"
                        placeholder='Enter street address'
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${formErrors.address ? 'border-red-500' : 'border-gray-300 dark:border-[#2a2a2a]'} bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none resize-none text-sm sm:text-base`}
                      />
                      {formErrors.address && (
                        <p className='mt-1 text-xs text-red-500'>{formErrors.address}</p>
                      )}
                    </div>

                    <div className='grid grid-cols-2 gap-2 sm:gap-3'>
                      <div>
                        <label className='block mb-1 text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300 sm:mb-2'>
                          City *
                        </label>
                        <input 
                          type="text" 
                          name="city"
                          placeholder='City'
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${formErrors.city ? 'border-red-500' : 'border-gray-300 dark:border-[#2a2a2a]'} bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm sm:text-base`}
                        />
                        {formErrors.city && (
                          <p className='mt-1 text-xs text-red-500'>{formErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className='block mb-1 text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300 sm:mb-2'>
                          ZIP Code *
                        </label>
                        <input 
                          type="text" 
                          name="zipCode"
                          placeholder='ZIP'
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-3 sm:px-4 py-2 rounded-lg border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-[#2a2a2a]'} bg-white dark:bg-[#0a0a0a] text-gray-800 dark:text-white focus:ring-2 focus:ring-[#155dfc] outline-none text-sm sm:text-base`}
                        />
                        {formErrors.zipCode && (
                          <p className='mt-1 text-xs text-red-500'>{formErrors.zipCode}</p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex gap-2 pt-2'>
                      <button
                        type="submit"
                        className='flex-1 bg-[#155dfc] text-white dark:text-black font-bold py-2.5 sm:py-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base'
                      >
                        {deliveryInfoSaved ? 'Update Info' : 'Save Info'}
                      </button>
                      
                      {deliveryInfoSaved && (
                        <button
                          type="button"
                          onClick={handleClearDeliveryInfo}
                          className='px-3 sm:px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base'
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
            <img 
              src={emptyCart} 
              alt="Empty Cart" 
              className='w-48 mb-4 sm:w-64 md:w-96 sm:mb-6 opacity-80'
            />
            <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold text-[#155dfc] mb-3 sm:mb-4'>
              Your Cart is Empty
            </h2>
            <p className='mb-6 text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-400 sm:mb-8'>
              Looks like you haven't added anything yet
            </p>
            <button
              onClick={() => navigate('/products')}
              className='px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#155dfc] to-[#22fbff] text-white dark:text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base'
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart