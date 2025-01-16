import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

// Import banner images from assets
import banner1 from '../../assets/banner/banner1.png';
import banner2 from '../../assets/banner/banner2.png';
import banner3 from '../../assets/banner/banner3.png';
import banner4 from '../../assets/banner/banner4.jpg';
import banner5 from '../../assets/banner/banner5.png';
import banner6 from '../../assets/banner/banner6.png';

const banners = [
  {
    image: banner1,
    title: "Virtual Reality",
    description: "Immerse Yourself in Digital World",
    buttonText: "Shop Now",
    path: "vr"
  },
  {
    image: banner2,
    title: "Smart Glass",
    description: "Stay Connected, See the Future",
    buttonText: "Discover More",
    path: "smartglasses"
  },
  {
    image: banner3,
    title: "Wireless Headphones",
    description: "Experience Freedom with Crystal Sound",
    buttonText: "Explore",
    path: "headphones"
  },
  {
    image: banner4,
    title: "Gaming Tools",
    description: "Elevate Your Game, Unleash Potential",
    buttonText: "Buy Now",
    path: "gaming"
  },
  {
    image: banner5,
    title: "Latest Phones",
    description: "Cutting-Edge Technology, Unmatched Performance",
    buttonText: "See More",
    path: "smartphones"
  },
  {
    image: banner6,
    title: "Efficent Laptops",
    description: "Powerful Performance, Sleek and Portable",
    buttonText: "Order Now",
    path: "laptops"
  }
];

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={3000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="rounded-2xl overflow-hidden shadow-xl"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index} className="slide">
            <div className="relative h-[500px] md:h-[500px]">

              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-8 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-xl text-white"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                      {banner.description}
                    </p>
                    <Link
                      to={`/category/${banner.path}`}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-colors text-lg"
                    >
                      {banner.buttonText}
                    </Link>
                    {/* <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg transition-colors text-lg">
                      {banner.buttonText}
                    </button> */}
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
     </div>
  );
};

export default Banner;
