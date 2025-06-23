import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const currency = '₹';
  const delivery_fee = 10;
const [userId, setUserId] = useState(null);

  console.log("🔗 Backend URL:", backend);

  const getCartData = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backend}/api/cart/get`, {
        headers: { token }
      });
      if (res.data.success) {
        setCartItem(res.data.cartdata);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    setToken(storedToken);
    try {
      const decoded = jwtDecode(storedToken);
      setUserId(decoded.id); // ✅ set userId from token payload
    } catch (err) {
      console.error("Invalid token", err);
      setUserId(null);
    }
  }
}, []);

  const addtocart = async (itemId, size) => {
    
    if (!token) {
    toast.error('Account not logged in');
    navigate('/login'); // redirect to login page
    return;
  }
  if (!size) {
      toast.error('Select Product Size');
      return;
    }
    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData);
    console.log("🛒 Cart updated:", cartData);

    if (token) {
      try {
      const res=  await axios.post(`${backend}/api/cart/add`, { itemid: itemId, size }, {
          headers: { token }
        });
   
      if (res.data.success && res.data.cartdata) {
        setCartItem({ ...res.data.cartdata });
      }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error('Failed to add item to cart');
      }
    }

    toast.success('Item added to cart');
  };

  const changeCartItem = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItem);

    if (!cartData[itemId]) return;

    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItem(cartData);
    if (token) {
      try {
     const res=   await axios.put(`${backend}/api/cart/update`, { itemid: itemId, size, quantity }, {
          headers: { token }
        });
      
      if (res.data.success && res.data.cartdata) {
        setCartItem({ ...res.data.cartdata });
      } // ✅ Refresh from backend
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error('Failed to update cart');
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
     
      const itemInfo = products.find(product => product._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItem[itemId]) {
        try {
          
          const quantity = cartItem[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        } catch (error) {
          console.error("Error calculating cart amount", error);
        }
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItem) {
      const sizes = cartItem[productId];
      for (const size in sizes) {
        try {
          const quantity = sizes[size];
          if (quantity > 0) {
            totalCount += quantity;
          }
        } catch (error) {
          console.error("Error counting cart quantity", error);
        }
      }
    }
    return totalCount;
  };

  const getproductsData = async () => {
    try {
      const response = await axios.get(`${backend}/api/product/list`);
      if (response.data.success) {
        console.log("Products fetched:", response.data.products);
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error('Failed to fetch products');
    }
  };

  // Load token once
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch cart when token is set
  useEffect(() => {
    if (token) getCartData();
  }, [token]);

  // Fetch products once
  useEffect(() => {
    getproductsData();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addtocart,
        cartItem,
        setCartItem,
        getCartAmount,
        currency,
        delivery_fee,
        getCartCount,
        navigate,
        backend,
        changeCartItem,
        setToken,
        token,userId,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;
