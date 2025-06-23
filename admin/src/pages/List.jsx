import React, { useState, useEffect } from 'react';
import { backend } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backend + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const removeProduct = async (id) => {
  try {
    const response = await axios.post(backend + '/api/product/remove', { id }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(); // refresh after delete
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error("Error deleting product: " + error.message); // ✅ Correct usage
  }
};

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All product list</p>
      <div className='flex flex-col gap-2'>
        <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] font-bold gap-2 text-center border pb-2">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 text-center border items-center py-2"
          >
            <img src={item.image[0]} alt={item.name} className="w-12 h-12 object-cover" />
            <div className="truncate">{item.name}</div>
            <div className="truncate">{item.description}</div>
            <div>₹{item.price}</div>
            <div>
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
