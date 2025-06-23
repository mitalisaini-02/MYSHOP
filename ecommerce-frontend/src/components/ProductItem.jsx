import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);
    const handleClick = () => {
    window.scrollTo(0,0);
  };
  return (
    <Link to={`/product/${id}`}  onClick={handleClick} className="text-gray-700 cursor-pointer">
      <div className="bg-[#eff0f2] border rounded-lg p-4 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition">
        <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
          <img
            className="object-contain h-44 transition-transform duration-300 hover:scale-110"
            src={Array.isArray(image) ? image[0] : image}
            alt={name}
          />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{name}</p>
          <p className="text-sm font-semibold text-gray-900">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
