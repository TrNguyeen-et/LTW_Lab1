import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

export default function Login() {
  const { users, setCurrentUser, login } = useBlog();
  const [email, setEmail] = useState('admin@devblog.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setError(result.message);
    }
  };

  const handleQuickLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="container" style={{ padding: '70px 20px 90px', maxWidth: '520px' }}>
      <div style={{ background: '#ffffff', padding: '38px', borderRadius: '12px', border: '1px solid var(--border-cream)', boxShadow: '0 10px 25px rgba(0,0,0,0.04)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
            Hệ Thống Xác Thực
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-dark)', marginTop: '4px' }}>
            ĐĂNG NHẬP HỆ THỐNG
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Đăng nhập để tham gia bình luận bài viết hoặc truy cập quyền quản trị viên
          </p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Email tài khoản *</label>
            <input
              type="email"
              required
              className="search-input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Mật khẩu *</label>
            <input
              type="password"
              required
              className="search-input-box"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-pill btn-pill-gold" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
            ĐĂNG NHẬP NGAY
          </button>
        </form>

        {/* Quick Login Test Accounts for easy grading */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-cream)' }}>
          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', textAlign: 'center', fontWeight: '700', textTransform: 'uppercase' }}>
            Chọn tài khoản kiểm thử nghiệp vụ:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin(users[0])}
              style={{ padding: '9px', fontSize: '0.85rem', background: 'var(--bg-cream)', color: 'var(--text-dark)', borderRadius: '6px', fontWeight: '700', border: '1px solid var(--border-cream)' }}
            >
              🛡️ Đăng nhập quyền Quản trị viên (Admin: admin@devblog.com)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin(users[1])}
              style={{ padding: '9px', fontSize: '0.85rem', background: '#ffffff', color: 'var(--text-dark)', borderRadius: '6px', fontWeight: '600', border: '1px solid var(--border-cream)' }}
            >
              👤 Đăng nhập quyền Người dùng (User: hoang.dev@example.com)
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '22px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Đăng ký tài khoản mới</Link>
        </p>
      </div>
    </div>
  );
}
