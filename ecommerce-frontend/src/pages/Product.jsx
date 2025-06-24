import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { products, currency, addtocart, token } = useContext(ShopContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const product = products.find(item => item._id === id);

  useEffect(() => {
    if (product?.image) {
      setImage(Array.isArray(product.image) ? product.image[0] : product.image);
    }
    setSelectedSize('');
  }, [product]);

  if (!product) {
    return <p className="text-center text-red-500 text-xl font-medium mt-10">Product not found</p>;
  }

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto text-gray-800">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Image Thumbnails */}
        <div className="flex md:flex-col gap-3">
          {Array.isArray(product.image) && product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-16 h-16 object-cover rounded cursor-pointer border transition ${image === img ? 'border-[#8d8583]' : 'border-gray-300'
                }`}
              onClick={() => setImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={image}
            alt={product.name || 'Product'}
            className="w-[250px] max-h-[400px] object-contain rounded-md shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold">Price: {currency}{product.price}</p>

          {/* Size Selector */}
          {product.size && product.size.length > 0 && (
            <div className="flex gap-2 mt-4">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 rounded text-sm font-medium transition 
                    ${selectedSize === size ? 'bg-[#2b2a4a] text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                if (selectedSize) {
                  addtocart(product._id, selectedSize);

                } else {
                  toast.error('Please select a size.');
                }
              }}
              className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                if (!token) {
                  toast.error('Account not logged in');
                  navigate('/login'); // redirect to login page
                  return;
                }
                if (selectedSize) {
                  navigate('/place-order', {
                    state: {
                      directBuy: {
                        _id: product._id,
                        image: product.image,
                        name: product.name,
                        price: product.price,
                        _size: selectedSize,
                        quantity: 1,
                      },
                    },
                  });
                } else {
                  toast.error('Please select a size.');
                }
              }}
              className="bg-[#EE6C4D] text-white px-6 py-2 rounded hover:bg-[#d95c3b] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-12 border-gray-300" />

      {/* Description */}
      <section className="text-black">
        <h2 className="text-xl font-semibold border-l-4 border-[#EE6C4D] pl-3 mb-2">Description</h2>
        <p className="text-gray-600 mb-4">
          An e-commerce website is an online platform that facilitates online shopping.
          It typically displays products or services with the ability to purchase directly.
        </p>
        <p className="text-gray-600">Delivery within 5-7 business days. Secure payment & easy return available.</p>
      </section>

      {/* Related Products */}
      <div className="my-10">
        <RelatedProducts item={product} />
      </div>
    </div>
  );
};

export default Product;
