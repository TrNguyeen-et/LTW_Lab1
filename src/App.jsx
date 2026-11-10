import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AboutUs from './pages/AboutUs';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <LanguageProvider>
      <BlogProvider>
        <BrowserRouter>
          <div className="app-container">
            {/* Header điều hướng thanh menu */}
            <Navbar />

            {/* Các tuyến đường React Router theo đúng cấu trúc đề tài Blog */}
            <main className="main-content">
              <Routes>
                {/* Trang chủ: http://localhost:3000 */}
                <Route path="/" element={<Home />} />

                {/* Danh sách bài viết có phân trang, lọc, tìm kiếm: http://localhost:3000/blogs */}
                <Route path="/blogs" element={<BlogList />} />

                {/* Chi tiết bài viết & bình luận: http://localhost:3000/blog/:id */}
                <Route path="/blog/:id" element={<BlogDetail />} />

                {/* Trang giới thiệu đề tài & nhóm: http://localhost:3000/about-us */}
                <Route path="/about-us" element={<AboutUs />} />

                {/* Quản lý tài khoản cá nhân người dùng: http://localhost:3000/profile */}
                <Route path="/profile" element={<UserProfile />} />

                {/* Bảng điều khiển quản trị viên: http://localhost:3000/admin */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Đăng nhập & Đăng ký */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Liên hệ */}
                <Route path="/contact" element={<Contact />} />

                {/* Xử lý URL không tồn tại 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer chân trang */}
            <Footer />
          </div>
        </BrowserRouter>
      </BlogProvider>
    </LanguageProvider>
  );
}
