import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '../App'; // Ensure this exports a valid backend URL
import { toast } from 'react-toastify';
import parcel from '../assets/parcel.png'; // Adjust the path as needed

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const currency = "₹"; // Define your currency symbol here

  // Fetch orders
  const fetchOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backend}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error('Fetch orders failed:', error.message);
      toast.error("Something went wrong while fetching orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Status update handler
  const statusHandler = async (event, orderId) => {
     const newStatus = event.target.value;
  console.log("Updating status:", orderId, "=>", newStatus);
    try {
      const response = await axios.post(
        `${backend}/api/order/status`,
        { orderId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        await fetchOrders(); // Refresh orders after update
        toast.success("Order status updated");
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Something went wrong while updating status.");
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Orders</h3>

      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 p-4 mb-4 bg-white shadow rounded"
        >
          <img src={parcel} alt="Parcel Icon" className="w-16 h-16 object-contain" />

          {/* Order Items and Address */}
          <div>
            {order.items.map((item, idx) => (
              <p key={idx} className="text-sm">
                {item.name}  X - {item.quantity} <span className="text-xs">({item._size})</span>
              </p>
            ))}

            <p className="font-medium mt-2">
              {order.address.first_name} {order.address.last_name}
            </p>
            <p className="text-sm">
              {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zip}
            </p>
            <p className="text-sm">Phone: {order.address.phone}</p>
          </div>

          {/* Payment & Other Info */}
          <div>
            <p>Items: {order.items.length}</p>
            <p>Method: {order.payment.method}</p>
            <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>
              Amount: {currency}
              {order.amount}
            </p>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-40 p-1 text-sm font-medium border rounded"
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
