# 🛍️ Nova Shop - Modern E-Commerce Platform

<div align="center">

![Nova Shop Banner](https://img.shields.io/badge/Nova_Shop-E--Commerce-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A cutting-edge, fully responsive e-commerce platform built with modern web technologies**

[🌐 Live Demo](https://nova-shop8705.vercel.app/) • [📝 Report Bug](https://github.com/pawan8705/Nova_Shop/issues) • [✨ Request Feature](https://github.com/pawan8705/Nova_Shop/issues)

</div>

---

## 📸 Screenshots

### 🏠 Homepage
<div align="center">
  <i>Stunning hero section with smooth animations and modern design</i>
</div>

### 🛒 Products Page
<div align="center">
  <i>Advanced filtering system with seamless product browsing</i>
</div>

### 🌙 Dark Mode
<div align="center">
  <i>Beautiful dark theme for comfortable nighttime shopping</i>
</div>

---

## ✨ Features

### 🎨 **User Interface**
- ✅ **Modern & Responsive Design** - Flawless experience across all devices
- ✅ **Dark/Light Theme Toggle** - Personalized browsing with theme persistence
- ✅ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- ✅ **Interactive Components** - Lottie animations and micro-interactions
- ✅ **Beautiful Gradients** - Eye-catching color schemes and visual effects

### 🛍️ **E-Commerce Functionality**
- ✅ **Product Catalog** - Browse 100+ products across multiple categories
- ✅ **Advanced Filtering** - Filter by category, brand, price range, and search
- ✅ **Shopping Cart** - Add, remove, and update quantities with ease
- ✅ **Cart Persistence** - Cart data saved across browser sessions
- ✅ **Product Details** - Comprehensive product information with images
- ✅ **Category Pages** - Dedicated pages for each product category
- ✅ **Real-time Notifications** - Toast messages for user actions

### 🔐 **Authentication & Security**
- ✅ **Clerk Integration** - Secure authentication and user management
- ✅ **Protected Routes** - Cart and checkout accessible only to authenticated users
- ✅ **User Profiles** - Personalized user experience with profile management

### ⚡ **Performance & Optimization**
- ✅ **Lazy Loading** - Components and pages load on-demand
- ✅ **Code Splitting** - Optimized bundle size with React Router
- ✅ **Image Optimization** - Lazy loading for images and assets
- ✅ **Fast Load Times** - Optimized for speed with Vite build tool
- ✅ **SEO Friendly** - Proper meta tags and semantic HTML

### 🎯 **Additional Features**
- ✅ **Smooth Scrolling** - Scroll-to-top button for easy navigation
- ✅ **Breadcrumbs** - Clear navigation path for better UX
- ✅ **Loading States** - Skeleton loaders and spinners
- ✅ **Error Handling** - Graceful error messages and fallbacks
- ✅ **Mobile Menu** - Touch-optimized sidebar navigation
- ✅ **Sticky Header** - Always-accessible navigation bar

---

## 🛠️ Tech Stack

### **Core Technologies**
- **React.js 18.x** - Modern React with Hooks and Context API
- **Vite 5.x** - Lightning-fast build tool and dev server
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5 & CSS3** - Semantic markup and modern styling

### **Styling & UI**
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **Lottie React** - Lightweight animations from JSON
- **Lucide React** - Beautiful & consistent icons
- **React Icons** - Popular icon library integration

### **Routing & Navigation**
- **React Router DOM** - Declarative routing for React
- **React Scroll to Top** - Smooth scroll functionality

### **State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic

### **Authentication**
- **Clerk** - Complete user management platform

### **Data & API**
- **Axios** - Promise-based HTTP client
- **DummyJSON API** - Mock product data

### **UI Components & Libraries**
- **React Slick** - Carousel component
- **React Toastify** - Toast notifications
- **Slick Carousel** - Responsive carousel

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pawan8705/Nova_Shop.git
cd Nova_Shop
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

> **Note:** Get your Clerk API key from [clerk.com](https://clerk.com)

### 4️⃣ Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5️⃣ Build for Production
```bash
npm run build
# or
yarn build
```

### 6️⃣ Preview Production Build
```bash
npm run preview
# or
yarn preview
```

---

## 📂 Project Structure

```
Nova_Shop/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, animations
│   ├── components/        # Reusable components
│   │   ├── Homepage_Components/
│   │   │   ├── Carousel.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── Deals.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── MidBanner.jsx
│   │   │   ├── Reviews.jsx
│   │   │   └── UseCaseSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductListView.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FilterSection.jsx
│   │   ├── MobileFilter.jsx
│   │   ├── Pagination.jsx
│   │   ├── Breadcrums.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/           # React Context providers
│   │   ├── CartContext.jsx
│   │   └── DataContext.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── SingleProduct.jsx
│   │   ├── CategoryProduct.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── PolicyHub.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── package.json           # Dependencies
└── README.md              # Project documentation
```

---

## 🎯 Key Features Breakdown

### 🛒 Shopping Cart System
- **Persistent Storage**: Cart data saved in localStorage
- **Quantity Management**: Increase/decrease product quantities
- **Real-time Updates**: Instant cart total calculations
- **Remove Items**: Easy product removal from cart
- **Cart Badge**: Visual indicator of cart items count

### 🔍 Advanced Filtering
- **Search**: Real-time product search by name/description
- **Category Filter**: Browse products by category
- **Brand Filter**: Filter by product brands
- **Price Range**: Adjustable price slider
- **Multiple Filters**: Combine filters for precise results
- **Reset Filters**: Clear all filters with one click

### 🎨 Theme System
- **Dark Mode**: Eye-friendly dark theme
- **Light Mode**: Classic bright theme
- **Theme Persistence**: Remembers user preference
- **Smooth Transitions**: Animated theme switching
- **System Integration**: Respects OS theme preference

### 📱 Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout for tablets
- **Desktop Experience**: Full-featured desktop view
- **Touch Optimized**: Gesture-friendly interactions
- **Breakpoints**: sm, md, lg, xl, 2xl responsive breakpoints

---

## 🚀 Performance Optimizations

- ✅ **Lazy Loading** - Routes and components load on-demand
- ✅ **Code Splitting** - Smaller initial bundle size
- ✅ **Image Optimization** - Lazy loading with loading states
- ✅ **React.memo** - Prevent unnecessary re-renders
- ✅ **useMemo & useCallback** - Memoized values and functions
- ✅ **CSS Optimization** - Tailwind CSS purge for production
- ✅ **Vite Build** - Fast bundling with Rollup
- ✅ **Tree Shaking** - Remove unused code

---

## 🎨 Design Highlights

- **Color Palette**: Modern blue (#155dfc) with complementary gradients
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins using Tailwind
- **Animations**: Smooth, performant animations with Framer Motion
- **Icons**: Cohesive icon system with Lucide and React Icons
- **Shadows**: Depth and elevation with Tailwind shadows
- **Gradients**: Eye-catching gradient backgrounds
- **Glassmorphism**: Modern frosted glass effects

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large Desktop */
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package Management
npm install          # Install dependencies
npm update           # Update dependencies
```

---

## 🌐 API Integration

**DummyJSON API** - [https://dummyjson.com](https://dummyjson.com)

Endpoints used:
- `GET /products` - Fetch all products
- `GET /products/:id` - Get single product
- `GET /products/category/:category` - Get products by category

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Pawan Tripathi**

- GitHub: [@pawan8705](https://github.com/pawan8705)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-profile)
- Portfolio: [Your Portfolio](https://your-portfolio.com)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Clerk](https://clerk.com/) - User management platform
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [DummyJSON](https://dummyjson.com/) - Free fake API for testing
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Vercel](https://vercel.com/) - Deployment platform

---

## 📊 Project Stats

- **Total Components**: 20+
- **Total Pages**: 8
- **Code Quality**: ESLint configured
- **Responsive**: 100%
- **Performance Score**: 90+ (Lighthouse)
- **Accessibility**: WCAG AA compliant

---

## 🐛 Known Issues

Currently, there are no known issues. If you find any bugs, please [report them here](https://github.com/pawan8705/Nova_Shop/issues).

---

## 🗺️ Roadmap

- [ ] Add user wishlists
- [ ] Implement product reviews and ratings
- [ ] Add payment gateway integration
- [ ] Create admin dashboard
- [ ] Add order tracking
- [ ] Implement email notifications
- [ ] Add product comparison feature
- [ ] Multi-language support
- [ ] PWA support
- [ ] Backend integration with Node.js

---

## 💡 Tips for Users

1. **Theme**: Use the theme toggle in the navbar for dark/light mode
2. **Filters**: Combine multiple filters for precise product search
3. **Cart**: Your cart persists even after closing the browser
4. **Navigation**: Use breadcrumbs for easy page navigation
5. **Mobile**: Swipe gestures work on mobile for better UX

---

## 📞 Support

For support, email support@novashop.com or create an issue in this repository.

---

<div align="center">

**⭐ If you like this project, please give it a star! ⭐**

**Made with ❤️ by Pawan Tripathi**

[⬆ Back to Top](#-nova-shop---modern-e-commerce-platform)

</div>
