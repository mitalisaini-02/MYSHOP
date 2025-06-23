import React from 'react';

const Navbar = ({ setToken }) => {
  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
      <img className="w-[max(10%,80px)]" src="/logo.png" alt="Logo" />
      <button
        onClick={() => {
          localStorage.removeItem('token'); // ✅ clear token from storage
          setToken('');                     // ✅ update React state
        }}
        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
