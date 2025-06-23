import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext'; // Adjust path to your context

const AddressForm = () => {
  const { backend, userId } = useContext(ShopContext); // Must provide userId and backend
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch address when component mounts
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${backend}/api/user/profile/${userId}`);
        if (res.data.success && res.data.user.address) {
          setAddress(res.data.user.address);
        }
      } catch (err) {
        console.error('Failed to fetch address:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [backend, userId]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backend}/api/user/update-address/${userId}`, {
        address,
      });

      if (res.data.success) {
        setMessage('✅ Address updated successfully!');
      } else {
        setMessage('❌ Failed to update address.');
      }
    } catch (error) {
      setMessage('❌ Server error while updating address.');
      console.error(error);
    }
  };

  if (loading) return <p>Loading your address...</p>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Address
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AddressForm;
