import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Order = () => {
  const { backend, token, currency, userId } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${backend}/api/order/userorder`,
        { userId },
        { headers: { token } }
      );

      if (res.data.success) {
        const allOrdersItem = [];

        res.data.orders.forEach(order => {
          order.items.forEach(item => {
            item.status = order.status;
            item.date = order.date;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token, backend, userId]);

  return (
    <div className="pt-10 px-4 sm:px-10 text-gray-800">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orderData.map(item => (
            <div
              key={`${item._id}-${item._size}-${item.date}`}
              className="p-4 bg-[#eff0f2] border rounded-lg shadow hover:shadow-lg transition-all flex flex-col sm:flex-row justify-between gap-6"
            >
              {/* Product Info */}
              <div className="flex gap-4">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover border"
                  src={
                    Array.isArray(item.image)
                      ? item.image[0]
                      : typeof item.image === 'string'
                      ? item.image.split(',')[0]
                      : ''
                  }
                  alt={item.title}
                />
                <div className="flex flex-col justify-between text-sm">
                  <div>
                    <p className="font-semibold text-base mb-1">{item.title || item.name}</p>
                    <p className="text-gray-600">
                      Price: {currency}
                      {item.price} &nbsp; | &nbsp; Qty: {item.quantity}
                    </p>
                    <p className="text-gray-600">Size: {item._size}</p>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                    <p>Payment: {item.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Status and Button */}
              <div className="flex sm:flex-col sm:justify-between gap-4 sm:items-end items-center">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.status}
                </div>
                <button
                  onClick={loadOrderData}
                  className="bg-gray-700 text-white px-4 py-1.5 text-sm rounded hover:bg-gray-800"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
