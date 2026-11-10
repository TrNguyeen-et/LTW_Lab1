import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { useBlog } from '../context/BlogContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/blogList.css';

const POSTS_PER_PAGE = 4; // Số bài viết trên mỗi trang phục vụ chức năng phân trang

export default function BlogList() {
  const { posts, categories } = useBlog();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Lọc và tìm kiếm theo Tiêu đề và Nội dung bài viết
  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => post.status === 'published')
      .filter(post => {
        const matchCategory = currentCategory === 'all' || post.category === currentCategory;
        const keyword = searchKeyword.toLowerCase();
        const matchSearch =
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword) ||
          post.excerpt.toLowerCase().includes(keyword);

        return matchCategory && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.publishedDate) - new Date(a.publishedDate);
        if (sortBy === 'oldest') return new Date(a.publishedDate) - new Date(b.publishedDate);
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'likes') return b.likes - a.likes;
        return 0;
      });
  }, [posts, currentCategory, searchKeyword, sortBy]);

  // 2. Xử lý phân trang
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleCategoryChange = (catId) => {
    setCurrentPage(1);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="blog-list-page">
      <div className="blog-list-header">
        <div className="container">
          <h1>{t('blogListTitle')}</h1>
          <p>{t('blogListSub')}</p>
        </div>
      </div>

      <div className="container blog-list-container">
        <div className="blog-list-layout">
          {/* Sidebar Lọc và Tìm kiếm */}
          <aside className="blog-filters-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">🔍 {t('searchPlaceholder')}</h3>
              <input
                type="text"
                className="search-input-box"
                placeholder={t('searchPlaceholder')}
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </div>

            <div className="filter-group">
              <h3 className="filter-title">📁 {t('categoriesTitle')}</h3>
              <div className="category-filter-list">
                {categories.map(cat => {
                  const count = cat.id === 'all' 
                    ? posts.filter(p => p.status === 'published').length
                    : posts.filter(p => p.status === 'published' && p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      className={`category-filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      <span>{cat.icon} {cat.name}</span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Khu vực hiển thị danh sách bài viết & Phân trang */}
          <main className="blog-content-area">
            {/* Toolbar: Số lượng & Sắp xếp */}
            <div className="blog-toolbar">
              <span className="results-count">
                {t('foundArticles')} <strong>{filteredPosts.length}</strong> {t('articlesMatching')} ({t('pageText')} {currentPage} / {totalPages})
              </span>

              <div className="sort-box">
                <label style={{ fontSize: '0.85rem', marginRight: '8px', color: '#64748b' }}>
                  {t('sortByLabel')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="sort-select"
                >
                  <option value="newest">{t('sortNewest')}</option>
                  <option value="oldest">{t('sortOldest')}</option>
                  <option value="views">{t('sortViews')}</option>
                  <option value="likes">{t('sortLikes')}</option>
                </select>
              </div>
            </div>

            {/* Posts Grid */}
            {paginatedPosts.length > 0 ? (
              <div className="blog-posts-grid">
                {paginatedPosts.map(post => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px dashed #cbd5e1',
                color: '#64748b'
              }}>
                <h3>{t('noArticlesFound')}</h3>
                <p>{t('noArticlesSub')}</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  {t('prevPage')}
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pageNumber => (
                  <button
                    key={pageNumber}
                    className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  {t('nextPage')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
