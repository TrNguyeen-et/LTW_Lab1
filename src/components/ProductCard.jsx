import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { title, category, price, oldPrice, rating, image, badge } = product;

  return (
    <div className="product-card">
      <div className="product-thumb">
        {badge && <span className="product-badge">{badge}</span>}
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>
        
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(rating))}</span>
          <span className="rating-value">{rating}</span>
        </div>

        <div className="product-price-row">
          <div className="prices">
            <span className="current-price">{price.toLocaleString('vi-VN')} đ</span>
            {oldPrice && <span className="old-price">{oldPrice.toLocaleString('vi-VN')} đ</span>}
          </div>
          <button className="add-cart-btn" title="Thêm vào giỏ">
            🛒 +
          </button>
        </div>
      </div>
    </div>
  );
}
