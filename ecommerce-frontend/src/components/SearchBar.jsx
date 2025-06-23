


import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import searchicon from '../assets/search-icon.png';
import { FiX } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = React.useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/collection') {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setShowSearch(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (!showSearch) return null;

    return showSearch && visible ? (
        <div className="w-full flex justify-center py-3 px-4  bg-[#363739e0]">
            <div className="flex items-center border border-gray-700 rounded-full px-4 py-2 w-full max-w-md bg-white shadow-md">
                <input
                    type="text"
                    className="flex-1 outline-none text-black bg-transparent text-sm"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search products"
                />
                <img src={searchicon} alt="Search icon" className="w-4 h-4 " />
                <FiX
                    className="ml-2 cursor-pointer text-gray-500"
                    onClick={() => {
                        setSearch('');
                        setShowSearch(false);
                    }}
                />
            </div>
        </div>
    ) : null;
};

export default SearchBar;