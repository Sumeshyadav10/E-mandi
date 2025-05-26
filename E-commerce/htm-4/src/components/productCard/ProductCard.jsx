import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Vegetables', slug: 'Vegetables', image: '/images/images.jpeg' },
  { name: 'Pulses', slug: 'Pulses', image: '/images/pulses.jpeg' },
  { name: 'Fruits', slug: 'Fruits', image: '/images/fruits.jpeg' },
  { name: 'Grains', slug: 'Grains', image: '/images/grains.jpeg' },
  { name: 'Other Items', slug: 'Other-Items', image: '/images/other-item.png' },
];

const ShopByCategory = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateScrollState = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
      }
    };

    updateScrollState();
    scrollRef.current?.addEventListener('scroll', updateScrollState);
    return () => scrollRef.current?.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 220;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (slug, idx) => {
    setActiveIndex(idx);
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-10 px-4 md:px-16 relative bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Shop By Category
      </h2>

      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow bg-white text-gray-800 hover:bg-gray-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full shadow bg-white text-gray-800 hover:bg-gray-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-6 px-6 md:justify-center"
      >
        {categories.map((cat, idx) => (
          <div
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug, idx)}
            className={`min-w-[150px] max-w-[150px] h-48 flex-shrink-0 cursor-pointer p-4 rounded-md shadow-md transition-all duration-300 flex flex-col justify-between items-center
              ${
                activeIndex === idx
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-800 hover:shadow-xl hover:scale-105'
              } border border-gray-300`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-20 object-contain"
            />
            <p className="mt-2 text-center text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
