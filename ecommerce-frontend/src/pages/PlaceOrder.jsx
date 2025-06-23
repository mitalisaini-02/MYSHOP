import React, { useState, useEffect, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import stripeIcon from '../assets/stripe.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const location = useLocation();
  const directBuy = location.state?.directBuy;

  const { backend, token, products, cartItem, setCartItem, getCartAmount, delivery_fee } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await axios.get(`${backend}/api/user/profile`, {
          headers: { token },
        });
        if (res.data.success && res.data.user?.address) {
          setFormData((prev) => ({
            ...prev,
            ...res.data.user.address,
            email: res.data.user.email || '',
          }));
        }
      } catch (err) {
        console.error('❌ Failed to auto-fill address:', err);
      }
    };

    if (token) fetchUserAddress();
  }, [token, backend]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => typeof value === 'string' && value.trim() !== ''
    );

    const phoneValid = /^[0-9]{10}$/.test(formData.phone);
    const postalCodeValid = /^[0-9]{6}$/.test(formData.postalCode);

    if (!allFieldsFilled) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!phoneValid) {
      toast.error('Phone must be a 10-digit number');
      return false;
    }
    if (!postalCodeValid) {
      toast.error('Postal code must be a 6-digit number');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    await axios.put(
      `${backend}/api/user/update-address`,
      { address: formData },
      { headers: { token } }
    );

    try {
      let orderItem = [];

      if (directBuy) {
        orderItem.push(directBuy);
      } else {
        for (const item in cartItem) {
          for (const size in cartItem[item]) {
            if (cartItem[item][size] > 0) {
              const iteminfo = structuredClone(products.find((product) => product._id === item));
              if (iteminfo) {
                iteminfo._size = size;
                iteminfo.quantity = cartItem[item][size];
                orderItem.push(iteminfo);
              }
            }
          }
        }
      }

      const totalAmount = directBuy
        ? directBuy.price * directBuy.quantity + delivery_fee
        : getCartAmount() + delivery_fee;

      const orderData = {
        address: formData,
        items: orderItem,
        amount: totalAmount,
        directBuy: directBuy || false,
      };

      switch (method) {
        case 'stripe':
          const stripeRes = await axios.post(`${backend}/api/order/place/stripe`, orderData, {
            headers: { token },
          });
          if (stripeRes.data.success) {
            window.location.replace(stripeRes.data.session_url);
          } else {
            toast.error('Failed to place order');
          }
          break;

        case 'cod':
          const codRes = await axios.post(`${backend}/api/order/place`, orderData, {
            headers: { token },
          });
          if (codRes.data.success) {
            toast.success('Order placed successfully');
            if (!directBuy) setCartItem({}); // Only clear cart for normal orders
            navigate('/order');
          } else {
            toast.error('Failed to place order');
          }
          break;

        default:
          toast.error('Please select a payment method');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error processing order');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 sm:pt-14 min-h-[80vh] text-gray-800 bg-[#d5d5d7] px-4">
      {/* Delivery Form */}
      <div className='flex flex-col gap-4 w-full mx-3 sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY" text2="ORDER" />
        </div>
        <div className='flex gap-2'>
          <input name="firstName" value={formData.firstName} onChange={handleChange} required type="text" placeholder='First Name' className='border border-gray-300 rounded-md p-2 w-full' />
          <input name="lastName" value={formData.lastName} onChange={handleChange} required type="text" placeholder='Last Name' className='border border-gray-300 rounded-md p-2 w-full' />
        </div>
        <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder='Email address' className='border border-gray-300 rounded-md p-2 w-full' />
        <input name="street" value={formData.street} onChange={handleChange} required type="text" placeholder='Street' className='border border-gray-300 rounded-md p-2 w-full' />
        <div className='gap-2 flex'>
          <input name="city" value={formData.city} onChange={handleChange} required type="text" placeholder='City' className='border border-gray-300 rounded-md p-2 w-full' />
          <input name="state" value={formData.state} onChange={handleChange} required type="text" placeholder='State' className='border border-gray-300 rounded-md p-2 w-full' />
        </div>
        <div className='gap-2 flex'>
          <input name="postalCode" value={formData.postalCode} onChange={handleChange} required type="tel" placeholder='Postal code' className='border border-gray-300 rounded-md p-2 w-full' />
          <input name="country" value={formData.country} onChange={handleChange} required type="text" placeholder='Country' className='border border-gray-300 rounded-md p-2 w-full' />
        </div>
        <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder='Phone number' className='border border-gray-300 rounded-md p-2 w-full' />
      </div>

      {/* Cart Summary & Payment */}
      <div className="flex flex-col gap-10 w-full sm:max-w-[500px] mt-8 sm:mt-0">
        <CartTotal directBuy={directBuy} />

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-md shadow">
          <Title text1="payment" text2="method" />
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Stripe (UPI / Card) */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:shadow ${method === 'stripe' ? 'border-green-500' : 'border-gray-300'
                }`}
            >
              <div
                className={`w-4 h-4 border-2 rounded-full ${method === 'stripe' ? 'bg-green-500' : 'bg-white'
                  }`}
              ></div>
              <img src={stripeIcon} alt="UPI" className="h-10 w-24" />
              <span className="font-medium text-gray-700">UPI / Card</span>
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:shadow ${method === 'cod' ? 'border-green-500' : 'border-gray-300'
                }`}
            >
              <div
                className={`w-4 h-4 border-2 rounded-full ${method === 'cod' ? 'bg-green-500' : 'bg-white'
                  }`}
              ></div>
              <span className="font-medium text-gray-700">Cash on Delivery</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition self-start"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
