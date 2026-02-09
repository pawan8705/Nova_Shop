/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { BsLightningChargeFill, BsSendFill, BsCheckCircleFill } from 'react-icons/bs'
import { IoSparklesSharp, IoRocketSharp } from 'react-icons/io5'
import { HiTrendingUp } from 'react-icons/hi'
import { useRef } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [randomPositions, setRandomPositions] = useState([])
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  // Generate random positions once after mount
  React.useEffect(() => {
    const positions = [...Array(5)].map(() => {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const x = Math.random() * 20 - 10
      return { top, left, x }
    })
    setRandomPositions(positions)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const socialIcons = [
    { Icon: FaFacebook, name: 'Facebook', color: '#1877F2', link: '#' },
    { Icon: FaInstagram, name: 'Instagram', color: '#E4405F', link: '#' },
    { Icon: FaTwitterSquare, name: 'Twitter', color: '#1DA1F2', link: '#' },
    { Icon: FaPinterest, name: 'Pinterest', color: '#E60023', link: '#' }
  ]

  const customerServices = [
    'Contact Us',
    'Shipping & Returns',
    'FAQs',
    'Order Tracking',
    'Size Guide'
  ]

  const features = [
    { icon: IoSparklesSharp, text: 'Premium Quality' },
    { icon: IoRocketSharp, text: 'Fast Delivery' },
    { icon: HiTrendingUp, text: 'Best Prices' }
  ]

  return (
    <footer className='relative overflow-hidden dark:bg-gradient-to-b dark:from-[#0a0818] dark:via-[#1a1535] dark:to-[#000] bg-gradient-to-b from-[#f5f3ed] via-[#eae4d5] to-[#e0d8c8] dark:text-white text-black'>

      <motion.div
        ref={footerRef}
        className='relative px-4 pt-16 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pt-20'
      >
        {/* Main Content Grid */}
        <div className='grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12'>
          {/* Company Info */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <Link to='/'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center gap-2 group'
              >
                <div
                  className='relative mb-4'
                >
                  <BsLightningChargeFill className='text-3xl text-[#155dfc]' />
                  <motion.div
                    className='absolute inset-0 bg-[#155dfc] rounded-full blur-lg opacity-50'
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
                <h1 className='text-2xl sm:text-3xl font-bold text-[#155dfc] mb-4'>
                  NovaShop
                </h1>
              </motion.div>
            </Link>
            
            <motion.p 
              className='text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400'
              variants={itemVariants}
            >
              Powering Your World with the Best in Shoping.
            </motion.p>

            {/* Contact Info with Icons */}
            <motion.div variants={itemVariants} className='space-y-3'>
              <motion.div 
                whileHover={{ x: 5 }}
                className='flex items-start gap-3 group'
              >
                <FaMapMarkerAlt className='text-[#155dfc] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform' />
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  262308 Khatima, Uttarakhnad, India 10001
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className='flex items-center gap-3 group'
              >
                <FaEnvelope className='text-[#155dfc] flex-shrink-0 group-hover:scale-110 transition-transform' />
                <a href="mailto:support@Zaptro.com" className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#155dfc] transition-colors'>
                  NovaShop@8705.com
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ x: 5 }}
                className='flex items-center gap-3 group'
              >
                <FaPhone className='text-[#155dfc] flex-shrink-0 group-hover:scale-110 transition-transform' />
                <a href="tel:1234567890" className='text-sm text-gray-600 dark:text-gray-400 hover:text-[#2d6fff9e] transition-colors'>
                  (123) 456-7890
                </a>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className='flex flex-wrap gap-2 pt-2'>
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className='flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-800'
                >
                  <feature.icon className='text-[#155dfc] text-sm' />
                  <span className='text-xs font-medium'>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
              Customer Service
            </h3>
            <motion.ul className='space-y-3'>
              {customerServices.map((service, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }
                  }}
                  whileHover={{ x: 5 }}
                  className='text-sm sm:text-base text-gray-600 dark:text-gray-400 cursor-pointer hover:text-[#155efcb3] transition-all duration-300 flex items-center gap-2'
                >
                  <motion.span
                    whileHover={{ scale: 1.5, rotate: 360 }}
                    className='w-1.5 h-1.5 rounded-full bg-[#155dfc]'
                  />
                  {service}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold text-[#155dfc]'>
              Follow Us
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Join our community for exclusive updates
            </p>
            
            <div className='flex flex-wrap gap-3'>
              {socialIcons.map(({ Icon, name, color, link }) => (
                <motion.a
                  key={name}
                  href={link}
                  variants={{
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        delay: 0.5,
                        type: "spring",
                        stiffness: 200
                      }
                    }
                  }}
                  whileHover={{
                    backgroundColor: color
                  }}
                  onHoverStart={() => setHoveredSocial(name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className='relative p-3 transition-all duration-300 bg-white border border-gray-200 shadow-lg group sm:p-4 rounded-2xl dark:bg-gray-900 hover:shadow-2xl dark:border-gray-800'
                >
                  <Icon className={`text-2xl sm:text-3xl transition-colors duration-300 ${
                    hoveredSocial === name 
                      ? 'text-white' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`} />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className='absolute inset-0 opacity-0 rounded-2xl blur-lg group-hover:opacity-50'
                    style={{ backgroundColor: color }}
                    transition={{ duration: 1 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Social Stats */}
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-3 gap-2 pt-4'
            >
              {['10K+', '5K+', '2K+'].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className='p-2 text-center border border-gray-200 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm dark:border-gray-800'
                >
                  <div className='text-lg font-bold text-[#155dfc]'>{stat}</div>
                  <div className='text-[10px] text-gray-500'>Followers</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className='space-y-4'>
            <h3 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#155dfc] to-[#44caff] bg-clip-text text-transparent'>
              Stay in the Loop
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Subscribe to get special offers, free giveaways, and exclusive deals!
            </p>
            
            <motion.form 
              onSubmit={handleSubmit}
              className='space-y-3'
            >
              <div className='relative'>
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  whileFocus={{ scale: 1.02 }}
                  className='w-full px-4 py-3 sm:py-3.5 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus:border-[#155dfc] outline-none text-gray-800 dark:text-white placeholder-gray-400 transition-all duration-300 shadow-lg'
                  required
                />
                <motion.div
                  className='absolute -translate-y-1/2 right-3 top-1/2'
                  animate={{ rotate: subscribed ? 360 : 0 }}
                >
                  <FaEnvelope className='text-gray-400' />
                </motion.div>
              </div>
              
              <motion.button
                type='submit'
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='w-full relative overflow-hidden bg-[#155dfc] text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#155dfc]/50 transition-all duration-300 flex items-center justify-center gap-2'
              >
                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className='flex items-center gap-2'
                    >
                      <BsCheckCircleFill className='text-xl' />
                      <span>Subscribed!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="subscribe"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className='flex items-center gap-2'
                    >
                      <span>Subscribe Now</span>
                      <BsSendFill className='text-lg' />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-[#44caff] to-[#155dfc]'
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.form>

            {/* Trust Badges */}
            <motion.div
              variants={itemVariants}
              className='flex items-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400'
            >
              <BsCheckCircleFill className='text-green-500' />
              <span>No spam, unsubscribe anytime</span>
            </motion.div>

            {/* Special Offer Banner */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='p-4 rounded-xl bg-[#155dfc] border border-[#155dfc]/20'
            >
              <div className='flex items-center gap-2 mb-2'>
                <IoSparklesSharp className='text-[#fffb00]' />
                <span className='text-sm font-bold'>Special Offer!</span>
              </div>
              <p className='text-xs text-[#ffffff]'>
                Get <span className='text-green-400 font-bold'>20% OFF</span> on your first order
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className='flex flex-col items-center justify-between gap-4 pt-4 text-sm text-gray-600 border-t-2 border-gray-500 sm:flex-row dark:text-gray-400 dark:border-gray-700'
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            className='flex items-center gap-2'
          >
            &copy; {new Date().getFullYear()} 
            <span className='font-bold text-[#155dfc]'>
              NovaShop
            </span>
            . Made by Pawan
          </motion.p>
          <motion.div
            className='flex items-center gap-4'
            variants={containerVariants}
          >
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link, i) => (
              <a
                key={i}
                href="#"
                className='hover:text-[#155dfc] transition-colors text-xs sm:text-sm'
              >
                {link}
              </a>
            ))}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className='flex items-center gap-2 text-xs'
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BsLightningChargeFill className='text-[#f6ff00]' />
            </motion.div>
            <span>Powered by Innovation</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer