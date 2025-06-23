import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products);
  }, [products]);

  return (
    <section className="my-14 px-4 sm:px-8 lg:px-16 text-xl md:text-2xl">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="Latest" text2="Collection" />
        <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-xl mx-auto">
          Explore our freshest drops — handpicked for quality, crafted with care. Get your favorites while they last.
        </p>
        <div className="w-20 h-1 bg-[#EE6C4D] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestProduct.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products available right now.</p>
        ) : (
          latestProduct.map((item) => (
            <div
              key={item._id}
              className="transform hover:-translate-y-1 hover:shadow-lg transition duration-300"
            >
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

export default LatestCollection;
