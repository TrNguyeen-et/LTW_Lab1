import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

export default function BlogCard({ post }) {
  const { id, title, excerpt, categoryName, coverImage, author, publishedDate, readTime, views, comments } = post;

  return (
    <article className="blog-card">
      <Link to={`/blog/${id}`} className="blog-card-thumb">
        <img src={coverImage} alt={title} loading="lazy" />
        <span className="blog-card-cat">{categoryName}</span>
      </Link>

      <div className="blog-card-body">
        <div className="blog-meta-top">
          <span>📅 {publishedDate}</span>
          <span>⏱️ {readTime}</span>
        </div>

        <h3 className="blog-card-title">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>

        <p className="blog-card-excerpt">{excerpt}</p>

        <div className="blog-card-footer">
          <div className="author-info">
            <img src={author.avatar} alt={author.name} className="author-avatar" />
            <div className="author-details">
              <span className="author-name">{author.name}</span>
              <span className="author-role">{author.role}</span>
            </div>
          </div>

          <div className="blog-stats">
            <span title="Lượt xem">👁️ {views}</span>
            <span title="Bình luận">💬 {comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
