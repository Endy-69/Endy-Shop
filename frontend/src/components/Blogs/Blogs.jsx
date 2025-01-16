import React from 'react';
import Heading from '../Shared/Heading';
import blog1 from '../../assets/blogs/Blog1.jpg';
import blog2 from '../../assets/blogs/Blog2.jpg';
import blog3 from '../../assets/blogs/Blog3.webp';
import { Link } from 'react-router-dom';

const blogData = [
  {
    id: 1,
    title: "The Latest Products of 2024",
    description: "Apple Vision Pro makes it easy to collaborate and connect wherever you are.",
    image: blog1,
    date: "February 12, 2024",
    author: "Endu Mekonnen",
    category: "VR",
    link: "https://www.apple.com/apple-vision-pro/"
  },
  {
    id: 2,
    title: "Powerfull Gaming Laptop",
    description: "Best Laptop from Asus for those who dare transcendence",
    image: blog2,
    date: "March 09, 2024",
    author: "Marcon Muluneh",
    category: "Laptop",
    link: "https://www.asus.com/laptops/for-gaming/all-series/"
  },
  {
    id: 3,
    title: "Sound Tuned to you",
    description: "Adaptive Audio that tailors noise control to your environment",
    image: blog3,
    date: "October 18, 2024",
    author: "Kim Kardashian",
    category: "VR",
    link: "https://www.apple.com/airpods-pro/"
  }
];

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <img src={blog.image} alt={blog.title} className=''/>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.author}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {blog.description}
        </p>
        <button className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
          <Link
            to={blog.link}
            target='blank'
          >
          Read More →
          </Link>
        </button>
      </div>
    </div>
  );
};

const Blogs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Heading
          title="Latest Blog Posts"
          subtitle="Stay updated with our latest electronics products"
          className="text-center mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
