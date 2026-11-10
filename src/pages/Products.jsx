import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategories } from '../data/products';
import '../styles/products.css';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter(item => {
        const matchCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchSearch = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [currentCategory, searchKeyword, sortBy]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="products-page">
      <div className="products-header-banner">
        <div className="container">
          <h1>Danh Sách Sản Phẩm</h1>
          <p>Khám phá hệ sinh thái sản phẩm công nghệ hiện đại tại TechZone</p>
        </div>
      </div>

      <div className="container products-page-container">
        <div className="products-layout">
          {/* Sidebar Bộ Lọc */}
          <aside className="filter-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">🔍 Tìm kiếm sản phẩm</h3>
              <input
                type="text"
                className="search-box"
                placeholder="Nhập tên sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-title">📁 Danh mục</h3>
              <div className="category-list">
                {mockCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-btn ${currentCategory === cat.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Products List */}
          <main className="products-content">
            <div className="products-toolbar">
              <span className="products-count">
                Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
              </span>
              <div className="products-sort">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="default">Sắp xếp: Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid-catalog">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <h3>Không tìm thấy sản phẩm phù hợp!</h3>
                <p>Vui lòng thử tìm kiếm với từ khóa khác hoặc đổi danh mục sản phẩm.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
