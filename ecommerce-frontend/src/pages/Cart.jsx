import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import CartTotal from '../components/CartTotal';
import { FaCaretUp, FaTrash, FaCaretDown } from 'react-icons/fa';

const Cart = () => {
  const { products, cartItem, currency, changeCartItem } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          const quantity = cartItem[productId][size];
          if (quantity > 0) {
            tempData.push({
              id: productId,
              size,
              quantity
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="border-t pt-10 px-4  min-h-screen">
      <div className="text-3xl mb-6">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartData.map((item) => {
          const productData = products.find(product => product._id === item.id);
          if (!productData) return null;

          return (
            <div
              key={`${item.id}-${item.size}`}
              className="p-5 bg-[#eff0f2] rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex gap-5">
                <img
                  src={Array.isArray(productData.image) ? productData.image[0] : productData.image}
                  alt={productData.title}
                  className="w-24 h-24 mt-3 object-contain rounded-md"
                />
                <div className="flex-1 space-y-2 text-sm">
                  <h2 className="text-lg font-semibold text-gray-800">{productData.title}</h2>

                  <p className="text-gray-500">Name: {productData.name||productData.title}</p>
                  <p className="text-gray-500">Size: <span className="font-medium">{item.size}</span></p>

                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-600 hover:text-black"
                      onClick={() => changeCartItem(item.id, item.size, item.quantity - 1)}
                    >
                      <FaCaretDown />
                    </button>
                    <span className="font-semibold text-gray-700">{item.quantity}</span>
                    <button
                      className="text-gray-600 hover:text-black"
                      onClick={() => changeCartItem(item.id, item.size, item.quantity + 1)}
                    >
                      <FaCaretUp />
                    </button>
                  </div>

                  <p className="text-gray-700 font-semibold">
                    Price: {currency}
                    {productData.price}
                  </p>
                </div>

                <button
                  onClick={() => changeCartItem(item.id, item.size, 0)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cartData.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-lg">
          Your cart is empty.
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end mt-16">
          <div className="w-full sm:w-2/3 md:w-1/2">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/place-order')}
                className="mt-4 bg-black text-white px-6 py-2 text-sm font-semibold rounded-md hover:bg-gray-900 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
