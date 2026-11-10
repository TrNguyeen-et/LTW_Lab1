import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <div className="about-hero">
        <div className="container">
          <h1>Về Chúng Tôi (About Us)</h1>
          <p>
            Giới thiệu dự án cuối môn: <strong>Xây dựng website dạng blog</strong> - Môn Lập Trình Web (LTW - 2026).
          </p>
        </div>
      </div>

      <div className="container about-content-section">
        {/* Story Section */}
        <div className="about-grid">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80" 
              alt="Đội ngũ phát triển dự án blog" 
            />
          </div>
          <div className="about-text">
            <h2>Mô Tả Đề Tài & Mục Tiêu Nghiệp Vụ</h2>
            <p>
              Dự án <strong>DevBlog</strong> được phát triển nhằm xây dựng một nền tảng xuất bản và đọc blog công nghệ hoàn chỉnh, phục vụ hai nhóm đối tượng chính:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
              <li>
                <strong>Người dùng (User):</strong> Xem danh sách bài viết có phân trang, lọc theo danh mục, tìm kiếm theo tiêu đề & nội dung, đăng nhập để bình luận tương tác, xem và cập nhật thông tin liên hệ cá nhân (tên, năm sinh, địa chỉ, sđt) và đổi mật khẩu.
              </li>
              <li>
                <strong>Quản trị viên (Admin):</strong> Đăng nhập quản trị, quản lý bài viết (thêm, sửa, xóa, ẩn, hiện), quản lý danh mục và quản lý tài khoản người dùng với đầy đủ tìm kiếm, sắp xếp và phân trang.
              </li>
            </ul>
            <Link to="/blogs" className="btn btn-primary">
              Khám Phá Các Bài Viết Demo →
            </Link>
          </div>
        </div>

        {/* Team Section (Yêu cầu 2-3 sinh viên) */}
        <div className="team-section">
          <div className="section-header">
            <span className="section-badge">Nhóm Sinh Viên Thực Hiện</span>
            <h2 className="section-title">Phân Công Nhiệm Vụ Trong Nhóm (3 Thành Viên)</h2>
            <p className="section-subtitle">
              Sự phối hợp chặt chẽ giữa các thành viên để hoàn thiện toàn diện Frontend, Backend và Triển khai
            </p>
          </div>

          <div className="container team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍💻</div>
              <h4>Sinh Viên 1 (Nhóm Trưởng)</h4>
              <p className="team-role">Frontend & Router Architect</p>
              <p className="team-desc">
                - Xây dựng cấu trúc Single Page Application với ReactJS & Vite.<br/>
                - Thiết lập định tuyến React Router DOM (v6), Navigation và Layout.<br/>
                - Phát triển giao diện Trang chủ, Trang danh sách bài viết có phân trang, tìm kiếm, lọc và sắp xếp.
              </p>
            </div>

            <div className="team-card">
              <div className="team-avatar">🎨</div>
              <h4>Sinh Viên 2</h4>
              <p className="team-role">UI/UX & User Features</p>
              <p className="team-desc">
                - Thiết kế giao diện chi tiết bài viết BlogDetail và hệ thống bình luận.<br/>
                - Xây dựng trang Quản lý thông tin tài khoản người dùng (Profile) & đổi mật khẩu.<br/>
                - Định dạng toàn bộ hệ thống bằng CSS hiện đại và Responsive đa thiết bị.
              </p>
            </div>

            <div className="team-card">
              <div className="team-avatar">⚙️</div>
              <h4>Sinh Viên 3</h4>
              <p className="team-role">Admin Dashboard & Backend Integration</p>
              <p className="team-desc">
                - Xây dựng Bảng điều khiển Quản trị viên (Admin Panel) quản lý bài viết, danh mục, tài khoản.<br/>
                - Thiết kế RESTful API với NodeJS/ExpressJS, kết nối Database.<br/>
                - Đóng gói ứng dụng với Docker và chuẩn bị triển khai Hosting (theo chuẩn CLO2).
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Box */}
        <div className="tech-stack-box">
          <h3>🛠️ Công Nghệ & Tiêu Chuẩn Thực Hiện (CLO1 & CLO2)</h3>
          <div className="tech-badges">
            <span className="tech-pill">⚡ Vite 6.0</span>
            <span className="tech-pill">⚛️ React 18</span>
            <span className="tech-pill">🧭 React Router DOM v6</span>
            <span className="tech-pill">🟢 NodeJS & ExpressJS (Backend)</span>
            <span className="tech-pill">🐳 Docker & Containerization</span>
            <span className="tech-pill">🐙 GitHub Version Control</span>
            <span className="tech-pill">📱 Responsive CSS Mobile-first</span>
          </div>
        </div>
      </div>
    </div>
  );
}
