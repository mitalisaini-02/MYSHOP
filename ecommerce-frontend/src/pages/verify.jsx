import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const { token, setCartItem, backend } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    if (!token) return;
    const isDirectBuy = searchParams.get('directBuy') === 'true';
    try {
      const res = await axios.post(
        `${backend}/api/order/verifystripe`,
        { success, orderId, directBuy: isDirectBuy },
        {
          headers: {
            'token': token,
          },
        }
      );
      console.log('Payment verification response:', res.data);
      if (res.data.success) {
        toast.success('Payment verified successfully');
        if (!isDirectBuy) setCartItem({});
        navigate('/order');
      } else {
        toast.error('Payment verification failed');
        navigate('/cart');
    } }catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Something went wrong while verifying payment.');
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-semibold">Verifying your payment...</h2>
    </div>
  );
};

export default Verify;
