import React, { useState } from 'react';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Liên Hệ Với Chúng Tôi</h1>
          <p>Đội ngũ TechZone luôn sẵn sàng lắng nghe và tư vấn giải pháp công nghệ cho bạn</p>
        </div>
      </div>

      <div className="container contact-page-container">
        <div className="contact-grid">
          {/* Thông tin liên hệ */}
          <div className="contact-info-card">
            <h3>Thông Tin Trụ Sở</h3>
            <p className="contact-info-desc">
              Hãy ghé thăm không gian trải nghiệm thiết bị công nghệ hiện đại hoặc liên hệ trực tiếp với chúng tôi qua các kênh bên dưới.
            </p>

            <div className="info-item-list">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-details">
                  <h4>Địa chỉ Showroom chính</h4>
                  <p>227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div className="info-details">
                  <h4>Tổng đài hỗ trợ</h4>
                  <p>Hotline: 1900 8888 (Miễn phí từ 8h00 - 21h30 hàng ngày)</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-details">
                  <h4>Hòm thư điện tử</h4>
                  <p>Email: hotro@techzone.vn / contact@techzone.vn</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-details">
                  <h4>Thời gian mở cửa</h4>
                  <p>Thứ 2 - Chủ Nhật: 08:30 - 21:30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form gửi liên hệ */}
          <div className="contact-form-card">
            <h3>Gửi Tin Nhắn Cho Chúng Tôi</h3>
            <p>Điền thông tin vào mẫu bên dưới, chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>

            {isSubmitted && (
              <div className="success-alert">
                🎉 Cảm ơn bạn đã gửi tin nhắn! Đội ngũ tư vấn sẽ liên hệ với bạn trong thời gian sớm nhất.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0912 345 678"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Nội dung cần hỗ trợ / tư vấn *</label>
                <textarea
                  name="message"
                  required
                  placeholder="Nhập thông điệp hoặc câu hỏi của bạn tại đây..."
                  className="form-control"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Gửi Tin Nhắn Ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
