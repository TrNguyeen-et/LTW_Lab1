import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/blogDetail.css';

export default function BlogDetail() {
  const { id } = useParams();
  const { posts, currentUser, addComment, deleteComment } = useBlog();
  const { t } = useLanguage();
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const post = posts.find(p => p.id === parseInt(id, 10));

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Không tìm thấy bài viết này!</h2>
        <p style={{ color: 'var(--text-muted)' }}>Bài viết có thể đã bị gỡ hoặc đường dẫn không chính xác.</p>
        <Link to="/blogs" className="btn-pill btn-pill-dark" style={{ marginTop: '24px' }}>
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const res = addComment(post.id, commentText);
    if (res?.success) {
      setCommentText('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 4000);
    }
  };

  return (
    <div className="blog-detail-article">
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/">Trang chủ</Link> / <Link to="/blogs">Bài viết</Link> / <span style={{ color: 'var(--text-dark)', fontWeight: '600' }}>{post.categoryName}</span>
        </div>

        {/* Article Header */}
        <header className="article-header">
          <span className="article-cat-badge">{post.categoryName}</span>
          <h1 className="article-title">{post.title}</h1>

          <div className="article-meta-row">
            <div className="author-meta-box">
              <img src={post.author.avatar} alt={post.author.name} />
              <div>
                <strong>{post.author.name}</strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.author.role}</span>
              </div>
            </div>
            <span>•</span>
            <span>📅 {t('publishedDateLabel')} {post.publishedDate}</span>
            <span>•</span>
            <span>⏱️ {post.readTime}</span>
            <span>•</span>
            <span>👁️ {post.views} {t('viewsLabel')}</span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="article-cover-wrap">
          <img src={post.coverImage} alt={post.title} />
        </div>

        {/* Content Body */}
        <div className="article-body-content">
          <p style={{ fontWeight: '600', fontSize: '1.2rem', color: '#121316', marginBottom: '28px', lineHeight: '1.7' }}>
            {post.excerpt}
          </p>
          <div>{post.content}</div>
        </div>

        {/* Comments Section (Yêu cầu a.4: Người dùng đăng nhập để lại bình luận) */}
        <section className="comments-section">
          <h3 className="comments-heading">💬 {t('commentsTitle')} ({post.comments?.length || 0})</h3>

          {currentUser ? (
            <div className="comment-form-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  Bình luận dưới tên: <strong style={{ color: 'var(--text-dark)' }}>{currentUser.name}</strong>
                  {currentUser.role === 'admin' && (
                    <span style={{ marginLeft: '8px', background: 'var(--accent-gold)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>
                      ADMIN
                    </span>
                  )}
                </span>
              </div>

              {commentSuccess && (
                <div style={{ background: '#ecfdf5', color: '#065f46', padding: '10px 14px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.88rem' }}>
                  🎉 Bình luận của bạn đã được đăng thành công!
                </div>
              )}

              <form onSubmit={handleCommentSubmit}>
                <textarea
                  className="comment-textarea"
                  placeholder={t('commentPlaceholder')}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn-pill btn-pill-gold" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>
                  {t('sendComment')}
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '8px',
              marginBottom: '28px',
              textAlign: 'center',
              border: '1px solid var(--border-cream)'
            }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '14px' }}>
                {t('loginToComment')}
              </p>
              <Link to="/login" className="btn-pill btn-pill-dark" style={{ padding: '8px 22px', fontSize: '0.88rem' }}>
                {t('loginNow')}
              </Link>
            </div>
          )}

          {/* List of comments */}
          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map(c => (
                <div key={c.id} className="comment-item">
                  <div className="comment-avatar">
                    {c.author.charAt(0)}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <div>
                        <span className="comment-author">{c.author}</span>
                        <span className="comment-date" style={{ marginLeft: '10px' }}>{c.date}</span>
                      </div>
                      {/* Cho phép người bình luận hoặc Admin xóa */}
                      {(currentUser?.role === 'admin' || currentUser?.name === c.author) && (
                        <button
                          onClick={() => { if (confirm('Xác nhận xóa bình luận này?')) deleteComment(post.id, c.id); }}
                          style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '600', cursor: 'pointer' }}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                    <p className="comment-text">{c.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px 0' }}>
                {t('noCommentsYet')}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
