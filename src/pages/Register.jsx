import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

export default function Register() {
  const { register } = useBlog();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthYear: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không trùng khớp!');
      return;
    }

    const result = register(formData);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px 80px', maxWidth: '600px' }}>
      <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>Đăng Ký Tài Khoản</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tạo tài khoản để tham gia bình luận và nhận bài viết mới</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Họ và tên *</label>
              <input
                type="text"
                required
                className="search-input-box"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Năm sinh *</label>
              <input
                type="number"
                required
                placeholder="Ví dụ: 2004"
                className="search-input-box"
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Địa chỉ Email *</label>
              <input
                type="email"
                required
                className="search-input-box"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Số điện thoại *</label>
              <input
                type="tel"
                required
                className="search-input-box"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Địa chỉ liên hệ</label>
            <input
              type="text"
              className="search-input-box"
              placeholder="Quận/Huyện, Tỉnh/TP"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Mật khẩu *</label>
              <input
                type="password"
                required
                className="search-input-box"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Xác nhận mật khẩu *</label>
              <input
                type="password"
                required
                className="search-input-box"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-pill btn-pill-gold" style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
            ĐĂNG KÝ TÀI KHOẢN
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: '#64748b' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: '#2563eb', fontWeight: 'bold' }}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}
