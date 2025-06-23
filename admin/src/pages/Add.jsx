import React, { useState } from 'react';
import upload_area from '../assets/upload_area.png';
import { backend } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('bestseller', bestseller);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);
    if (image4) formData.append('image4', image4);

    const response = await axios.post(
      `${backend}/api/product/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token here
        },
      }
    );

    console.log("Response:", response.data);
if(response.data.success) {
    toast.success(response.data.message);  
    setName('');
    setDescription('');
    
    setPrice('');
   
    setBestseller(false);
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
} else {
    toast.error(response.data.message);

}
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Failed to add product. Unauthorized?");
  }
};


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
     <div>
  <p className='mb-2'>Upload Image</p>
  <div className='flex gap-2'>
    <label htmlFor="image1">
      <img
        className='w-20 h-20 object-cover border'
        src={image1 ? URL.createObjectURL(image1) : upload_area}
        alt="Upload 1"
      />
      <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
    </label>
    <label htmlFor="image2">
      <img
        className='w-20 h-20 object-cover border'
        src={image2 ? URL.createObjectURL(image2) : upload_area}
        alt="Upload 2"
      />
      <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
    </label>
    <label htmlFor="image3">
      <img
        className='w-20 h-20 object-cover border'
        src={image3 ? URL.createObjectURL(image3) : upload_area}
        alt="Upload 3"
      />
      <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
    </label>
    <label htmlFor="image4">
      <img
        className='w-20 h-20 object-cover border'
        src={image4 ? URL.createObjectURL(image4) : upload_area}
        alt="Upload 4"
      />
      <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
    </label>
  </div>
</div>

      <div>
        <p>Product Name</p>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          placeholder='Type here'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <p>Description</p>
        <input
          className="border border-gray-300 p-2 rounded"
          type="text"
          placeholder='Type here'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <p>Product Category</p>
        <select
          className='w-full px-3 py-2'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Sub Category</p>
        <select
          className='w-full px-3 py-2'
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winter">Winter</option>
        </select>
      </div>

      <div>
        <p className="mb-2">Product Price</p>
        <input
          className="w-full px-3 py-2 sm:w-[120px]"
          type="number"
          placeholder='25'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <p>Product Sizes</p>
        <div className='flex gap-2'>
          {["S", "M", "L", "XL"].map((size) => (
            <p
              key={size}
              className={`bg-slate-200 px-3 py-1 cursor-pointer ${
                sizes.includes(size) ? 'bg-gray-500 text-white' : ''
              }`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          id='bestseller'
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label htmlFor="bestseller" className='cursor-pointer ml-2'>Add to Bestseller</label>
      </div>

      <button type="submit" className='bg-black text-white px-5 py-2 rounded'>ADD</button>
    </form>
  );
};

export default Add;
