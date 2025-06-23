import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import searchicon from "../assets/search.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setShowSearch, showSearch, setCartItem, navigate, token, setToken, getCartCount } = useContext(ShopContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const logoutHandler = () => {
    navigate('/login');
    setToken('');
    localStorage.removeItem('token');
    setCartItem({});
  };

  return (
    <header className="bg-[#292b2d] top-0 w-full text-white px-6 py-4">
      <div className="flex items-center gap-2 justify-between  mx-auto">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold ">
          MyShop
        </NavLink>
        <div className="flex items-center gap-8">
          {/* Desktop Links */}
          <nav className="hidden ml-6 md:ml-15 md:flex gap-6 text-sm">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold underline"
                    : "hover:text-yellow-200"
                }
              >
                {["Home", "Collection", "About", "Contact"][i]}
              </NavLink>
            ))}
          </nav>
          {/* Search icon */}
          <div >
            <img
              src={searchicon}
              onClick={() => { setShowSearch(!showSearch); navigate('/collection'); }}
              alt="Search"
              className="cursor-pointer w-5"
            />
          </div>
        </div>



        {/* Icons */}
        <div className="flex gap-4 ml-30 md:ml-20 items-center relative">
          {/* Profile Icon and Dropdown */}

          {/* Profile Icon and Dropdown with click-based toggle */}
          <div className="relative">
            <FaUser
              onClick={() => {
                if (!token) navigate('/login');
                else setShowMenu(prev => !prev);
              }}
              className="w-5 h-5 cursor-pointer"
            />

            {token && showMenu && (
              <div className="absolute right-0 top-full bg-white text-black shadow-lg rounded mt-2 w-48 z-10">
                <div className="flex flex-col items-start gap-2 py-3 px-4 bg-slate-100 text-sm">
                  <p className="cursor-pointer hover:underline hover:text-slate-600" onClick={() => { setShowMenu(false); navigate('/profile') }}>My Profile</p>
                  <p className="cursor-pointer hover:underline hover:text-slate-600" onClick={() => { navigate('/order'); setShowMenu(false); }}>Orders</p>
                  <p className="cursor-pointer hover:underline hover:text-slate-600" onClick={() => { logoutHandler(); setShowMenu(false); }}>Logout</p>
                </div>
              </div>
            )}
          </div>



          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="w-5 h-5" />
            <span className="absolute -right-2 -bottom-2 bg-red-600 text-white text-xs rounded-full px-1">
              {getCartCount?.() || 0}
            </span>
          </Link>

          {/* Hamburger / Close icon */}
          <button className="md:hidden bg-transparent" onClick={toggleMenu}>
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiAlignJustify className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-[#1f1f1f] p-4 rounded">
          {["/", "/collection", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline-offset-4 font-semibold"
                  : "text-white hover:underline underline-offset-2"
              }
            >
              {["Home", "Collection", "About", "Contact"][i]}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
