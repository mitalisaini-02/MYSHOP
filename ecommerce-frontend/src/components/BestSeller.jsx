import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product => product.bestseller === true);
    setBestSeller(filtered);
  }, [products]);

  return (
    <section className="my-14 px-4 sm:px-8 lg:px-16 text-xl md:text-2xl">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="Best" text2="Sellers" />
        <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-xl mx-auto">
          Discover our most loved and top-rated products — chosen by thousands of happy customers.
        </p>
        <div className="w-20 h-1 bg-[#EE6C4D] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSeller.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No bestsellers available right now.</p>
        ) : (
          bestSeller.map(item => (
            <div
              key={item._id}
              className="transform hover:-translate-y-1 hover:shadow-lg transition duration-300 relative"
            >
              {/* Bestseller Tag */}
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full z-10 shadow">
                Bestseller
              </span>

              <ProductItem
                id={item._id}
                image={item.image}
                name={item.title || item.name}
                price={item.price}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BestSeller;
