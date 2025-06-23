import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaBoxOpen, FaQuestionCircle } from 'react-icons/fa';

const Profile = () => {
  const { backend, token, setToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backend}/api/user/profile`, {
          headers: { token }
        });
        if (res.data.success) {
          setUserData({
            name: res.data.user.name,
            email: res.data.user.email
          });
        } else {
          toast.error("Failed to load user profile");
        }
      } catch (error) {
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [backend, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-[#d5d5d7] text-gray-800">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center flex-col mb-6">
          <FaUserCircle className="text-6xl text-blue-600 mb-2" />
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome, {userData.name.split(' ')[0]}</h2>
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-28 text-gray-500 font-medium">Full Name:</span>
            <span className="text-lg font-semibold text-gray-800">{userData.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-28 text-gray-500 font-medium">Email:</span>
            <span className="text-lg font-semibold text-gray-800">{userData.email}</span>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate('/order')}
            className="w-full flex items-center gap-3 justify-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            <FaBoxOpen /> My Orders
          </button>

          <button
            onClick={() => navigate('/info')}
            className="w-full flex items-center gap-3 justify-center bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <FaQuestionCircle /> FAQs & Policies
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 justify-center bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
