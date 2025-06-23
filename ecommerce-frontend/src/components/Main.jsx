import React, { useEffect, useState } from "react";
import './Main.css'; // Make sure CSS is still imported

const Box = ({ image,name, price, rating }) => {
  return (
    <div className="product-box">
      <img src={image} alt="product" className="product-image" />
      <div className="product-details">
        <h4>{name}</h4>
      </div>
      <div className="product-price-wishlist">
        <span className="product-price">${price}</span>
        <button className="wishlist-button">❤️</button>
      </div>
      <div className="product-rating">
        <span>Rating: {rating} ⭐</span>
      </div>
    </div>
  );
};

const Main = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <main className="home-main">
      <section className="hero-banner">
        <img src="/src/images/hero.jpg" alt="Hero Banner" />
      </section>
      <section className="product-section">
        <h2>Deals of the Day</h2>
        <div className="product-grid">
          {products.map((product) => (
            <Box
              key={product.id}
              image={product.image}
              name={product.title}
              price={product.price}
              rating={product.rating.rate}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
