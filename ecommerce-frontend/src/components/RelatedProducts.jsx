import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ item }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0 && item?.category && item?.subCategory) {
      const filtered = products.filter(product =>
        product._id !== item._id &&
        product.category === item.category &&
        product.subCategory === item.subCategory
      );

      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [products, item]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-black mb-4 relative inline-block">
        <span className="border-b-4 border-orange-500 pb-1">Related products</span>
      </h2>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map(product => (
            <div
              key={product._id}
              className="transition-transform transform hover:-translate-y-1 hover:shadow-md"
            >
              <ProductItem
                id={product._id}
                image={product.image}
                name={product.title || product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
