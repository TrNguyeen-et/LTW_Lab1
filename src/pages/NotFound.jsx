import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: '800', color: '#2563eb', marginBottom: '10px' }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '16px' }}>Trang Không Tồn Tại</h2>
      <p style={{ color: '#64748b', maxWidth: '500px', marginBottom: '30px' }}>
        Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được di chuyển. Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
      </p>
      <Link to="/" className="btn btn-primary">
        ← Quay Về Trang Chủ
      </Link>
    </div>
  );
}
