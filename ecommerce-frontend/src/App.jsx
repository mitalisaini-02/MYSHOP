import Home from './pages/Home';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/variables.css';
import ScrollToTop from './pages/ScrollToTop'; // adjust the path as needed

import Navbar from './components/Navbar';
import Cart from './pages/cart'; // Make sure the path and casing match your file exactly
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import About from './pages/About';
import Order from './pages/Order';
import Footer1 from './components/footer1';
import SearchBar from './components/SearchBar';
import Collection from './pages/Collection';
import "react-toastify/dist/ReactToastify.css";
import Verify from './pages/verify';
import Profile from './pages/Profile';
import Delivery from './pages/Info/Delivery';
import PrivacyPolicy from './pages/Info/PRivacy';
import TermsCondition from './pages/Info/term';

function App() {
  return (
    <div >
      <ToastContainer />
         <ScrollToTop />
      <Navbar className='fixed' />
      <SearchBar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        {/* contact */}
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:id" element={<Product />} />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />

        <Route path="/profile" element={<Profile />} />
<Route path="/delivery" element={<Delivery />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<TermsCondition />} />
        <Route path="/verify" element={<Verify />} />

      </Routes>
      <hr className='my-4 border-slate-600' />
      <Footer1 />
    </div>
  );
}

export default App;
