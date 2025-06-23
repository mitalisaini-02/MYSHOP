import React, { useContext, useEffect, useState } from 'react';
import dropdown from '../assets/dropdown.png';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortMethod, setSortMethod] = useState('relevant');

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  const toggle_category = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter(item => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggle_subCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter(item => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  const handlesortChange = (e) => {
    setSortMethod(e.target.value);
  };

  useEffect(() => {
    let filteredProducts = [...products];

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        category.includes(product.category)
      );
    }

    if (showSearch && search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.title?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        subCategory.includes(product.subCategory)
      );
    }

    if (sortMethod === 'low-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'high-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filteredProducts);
  }, [category, subCategory, sortMethod, showSearch, search, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t bg-[#d5d5d7] min-h-screen px-4 pb-12">
      {/* Filter Panel */}
      <div className="min-w-[250px] text-gray-800">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 cursor-pointer text-xl font-semibold text-black"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transform transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={dropdown}
            alt="dropdown"
          />
        </div>

        <div className={`mt-6 border rounded-lg bg-white shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}>
          <div className="px-5 py-4">
            <p className="text-lg font-semibold mb-3">Category</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {['Men', 'Women', 'Kids'].map(cat => (
                <label className="flex gap-2 items-center" key={cat}>
                  <input type="checkbox" value={cat} onChange={toggle_category} />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <hr />
          <div className="px-5 py-4">
            <p className="text-lg font-semibold mb-3">Subcategory</p>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
                <label className="flex gap-2 items-center" key={sub}>
                  <input type="checkbox" value={sub} onChange={toggle_subCategory} />
                  {sub}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 w-full">
        <div className="flex flex-col  text-xl sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <Title  text1="ALL" text2="collections" />
          <select
            onChange={handlesortChange}
            className="border border-gray-300 rounded-md text-gray-600 text-sm px-3 py-2 shadow-sm focus:outline-none"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {filterProducts?.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 text-lg font-medium">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filterProducts.map(item => (
              <ProductItem
                key={item._id}
                name={item.title || item.name}
                id={item._id}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
