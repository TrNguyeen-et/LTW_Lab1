import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';

export default function UserProfile() {
  const { currentUser, updateUserProfile } = useBlog();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    birthYear: currentUser?.birthYear || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    email: currentUser?.email || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  if (!currentUser) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Bạn chưa đăng nhập!</h2>
        <p>Vui lòng đăng nhập để xem và cập nhật thông tin cá nhân.</p>
      </div>
    );
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setProfileMsg('✅ Cập nhật thông tin tài khoản thành công!');
    setTimeout(() => setProfileMsg(''), 4000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMsg('❌ Mật khẩu mới và xác nhận mật khẩu không trùng khớp!');
      return;
    }
    setPasswordMsg('✅ Đổi mật khẩu thành công!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordMsg(''), 4000);
  };

  return (
    <div className="container" style={{ padding: '50px 20px 80px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a' }}>Quản Lý Thông Tin Tài Khoản</h1>
        <p style={{ color: '#64748b' }}>Xem, cập nhật thông tin liên hệ và quản lý bảo mật tài khoản cá nhân</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        {/* 1. Cập nhật thông tin liên hệ */}
        <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
            👤 Thông Tin Cá Nhân & Liên Hệ
          </h2>

          {profileMsg && (
            <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              {profileMsg}
            </div>
          )}

          <form onSubmit={handleProfileSubmit}>
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
                  className="search-input-box"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
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

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Email</label>
                <input
                  type="email"
                  disabled
                  className="search-input-box"
                  style={{ background: '#f1f5f9' }}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Địa chỉ liên hệ</label>
              <input
                type="text"
                className="search-input-box"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-pill btn-pill-gold" style={{ marginTop: '20px' }}>
              LƯU THAY ĐỔI THÔNG TIN
            </button>
          </form>
        </div>

        {/* 2. Đổi mật khẩu */}
        <div style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>
            🔒 Đổi Mật Khẩu Tài Khoản
          </h2>

          {passwordMsg && (
            <div style={{
              background: passwordMsg.includes('❌') ? '#fef2f2' : '#ecfdf5',
              color: passwordMsg.includes('❌') ? '#991b1b' : '#065f46',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              {passwordMsg}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Mật khẩu hiện tại *</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu hiện tại"
                  className="search-input-box"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  className="search-input-box"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Xác nhận mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại mật khẩu mới"
                  className="search-input-box"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-pill btn-pill-dark" style={{ marginTop: '20px' }}>
              CẬP NHẬT MẬT KHẨU
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
