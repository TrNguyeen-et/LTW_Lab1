import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { useLanguage } from '../context/LanguageContext';

export default function AdminDashboard() {
  const {
    posts,
    categories,
    users,
    currentUser,
    setCurrentUser,
    addPost,
    editPost,
    deletePost,
    togglePostVisibility,
    addCategory,
    editCategory,
    deleteCategory,
    addUser,
    editUser,
    deleteUser
  } = useBlog();

  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'categories', 'users'

  // ==================== QUẢN LÝ BÀI VIẾT ====================
  const [postSearch, setPostSearch] = useState('');
  const [postCatFilter, setPostCatFilter] = useState('all');
  const [postSort, setPostSort] = useState('newest');
  const [postPage, setPostPage] = useState(1);
  const postsPerPage = 5;

  // Modal Thêm / Sửa bài viết
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postFormData, setPostFormData] = useState({
    title: '',
    category: 'frontend',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000',
    readTime: '5 min read',
    status: 'published'
  });

  // ==================== QUẢN LÝ DANH MỤC ====================
  const [catSearch, setCatSearch] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📁');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');

  // ==================== QUẢN LÝ TÀI KHOẢN (USER & ADMIN) ====================
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 4;

  // Modal Thêm / Sửa User & Admin
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    phone: '',
    address: '',
    birthYear: '2000',
    password: ''
  });

  // Kiểm tra quyền Admin
  const isAdmin = currentUser?.role === 'admin';

  // 1. Filter, Search, Sort & Paginate Bài viết
  const filteredPosts = useMemo(() => {
    return posts
      .filter(p => {
        const matchCat = postCatFilter === 'all' || p.category === postCatFilter;
        const matchSearch =
          p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(postSearch.toLowerCase());
        return matchCat && matchSearch;
      })
      .sort((a, b) => {
        if (postSort === 'newest') return new Date(b.publishedDate) - new Date(a.publishedDate);
        if (postSort === 'oldest') return new Date(a.publishedDate) - new Date(b.publishedDate);
        if (postSort === 'views') return b.views - a.views;
        return 0;
      });
  }, [posts, postCatFilter, postSearch, postSort]);

  const totalPostPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const paginatedPosts = filteredPosts.slice(
    (postPage - 1) * postsPerPage,
    postPage * postsPerPage
  );

  // 2. Filter Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [users, userRoleFilter, userSearch]);

  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const paginatedUsers = filteredUsers.slice(
    (userPage - 1) * usersPerPage,
    userPage * usersPerPage
  );

  // Handlers Bài viết
  const openCreatePostModal = () => {
    setEditingPostId(null);
    setPostFormData({
      title: '',
      category: 'frontend',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000',
      readTime: '6 min read',
      status: 'published'
    });
    setShowPostModal(true);
  };

  const openEditPostModal = (post) => {
    setEditingPostId(post.id);
    setPostFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      readTime: post.readTime,
      status: post.status
    });
    setShowPostModal(true);
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    const catObj = categories.find(c => c.id === postFormData.category);
    const postPayload = {
      ...postFormData,
      categoryName: catObj ? catObj.name : 'Chung'
    };

    if (editingPostId) {
      editPost(editingPostId, postPayload);
    } else {
      addPost(postPayload);
    }
    setShowPostModal(false);
  };

  // Handlers Danh mục
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim(), newCatIcon);
    setNewCatName('');
  };

  const handleSaveEditCategory = (catId) => {
    if (!editCatName.trim()) return;
    editCategory(catId, editCatName.trim());
    setEditingCatId(null);
  };

  // Handlers User & Admin
  const openCreateUserModal = () => {
    setEditingUserId(null);
    setUserFormData({
      name: '',
      email: '',
      role: 'user',
      phone: '',
      address: '',
      birthYear: '2000',
      password: ''
    });
    setShowUserModal(true);
  };

  const openEditUserModal = (user) => {
    setEditingUserId(user.id);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      address: user.address || '',
      birthYear: user.birthYear || '2000',
      password: ''
    });
    setShowUserModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUserId) {
      editUser(editingUserId, userFormData);
    } else {
      addUser(userFormData);
    }
    setShowUserModal(false);
  };

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '16px', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>
          🛡️ YÊU CẦU QUYỀN QUẢN TRỊ VIÊN (ADMIN)
        </h2>
        <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.7' }}>
          Bạn đang đăng nhập với tư cách người dùng thông thường hoặc chưa đăng nhập. Để truy cập bảng quản trị theo đúng luồng nghiệp vụ của đề tài, vui lòng chuyển sang tài khoản Quản trị viên bên dưới.
        </p>
        <button
          className="btn-pill btn-pill-gold"
          onClick={() => setCurrentUser(users[0])}
        >
          🔑 Chuyển sang Tài Khoản Admin (admin@devblog.com)
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '50px 20px 90px' }}>
      {/* Admin Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
            Hệ Thống Quản Trị Đề Tài Blog
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '700', color: 'var(--text-dark)' }}>
            {t('adminHeading')}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('adminSub')}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {activeTab === 'posts' && (
            <button className="btn-pill btn-pill-gold" onClick={openCreatePostModal}>
              ➕ {t('addNewPostBtn')}
            </button>
          )}
          {activeTab === 'users' && (
            <button className="btn-pill btn-pill-gold" onClick={openCreateUserModal}>
              ➕ Thêm Tài Khoản Mới
            </button>
          )}
        </div>
      </div>

      {/* Tabs Điều Hướng Quản Trị */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid var(--border-cream)', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('posts')}
          style={{
            padding: '14px 24px',
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            letterSpacing: '0.5px',
            color: activeTab === 'posts' ? 'var(--text-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'posts' ? '3px solid var(--text-dark)' : 'none',
            background: 'none'
          }}
        >
          {t('tabPosts')} ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '14px 24px',
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            letterSpacing: '0.5px',
            color: activeTab === 'categories' ? 'var(--text-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'categories' ? '3px solid var(--text-dark)' : 'none',
            background: 'none'
          }}
        >
          {t('tabCategories')} ({categories.length - 1})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '14px 24px',
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            letterSpacing: '0.5px',
            color: activeTab === 'users' ? 'var(--text-dark)' : 'var(--text-muted)',
            borderBottom: activeTab === 'users' ? '3px solid var(--text-dark)' : 'none',
            background: 'none'
          }}
        >
          {t('tabUsers')} ({users.length})
        </button>
      </div>

      {/* ===================================================
          TAB 1: QUẢN LÝ BÀI VIẾT (Thêm, Sửa, Xóa, Ẩn/Hiện, Phân trang, Tìm kiếm, Lọc)
          =================================================== */}
      {activeTab === 'posts' && (
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-cream)', padding: '28px' }}>
          {/* Controls: Search, Filter Category, Sort */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm bài viết theo tiêu đề hoặc tóm tắt..."
              value={postSearch}
              onChange={(e) => { setPostSearch(e.target.value); setPostPage(1); }}
              style={{ padding: '10px 18px', border: '1px solid var(--border-cream)', borderRadius: '9999px', flex: '1', minWidth: '260px' }}
            />

            <select
              value={postCatFilter}
              onChange={(e) => { setPostCatFilter(e.target.value); setPostPage(1); }}
              style={{ padding: '10px 16px', border: '1px solid var(--border-cream)', borderRadius: '9999px', outline: 'none' }}
            >
              <option value="all">Tất cả danh mục ({posts.length})</option>
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              value={postSort}
              onChange={(e) => setPostSort(e.target.value)}
              style={{ padding: '10px 16px', border: '1px solid var(--border-cream)', borderRadius: '9999px', outline: 'none' }}
            >
              <option value="newest">Ngày đăng: Mới nhất</option>
              <option value="oldest">Ngày đăng: Cũ nhất</option>
              <option value="views">Lượt xem nhiều nhất</option>
            </select>
          </div>

          {/* Posts Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-cream)', borderBottom: '2px solid var(--border-cream)' }}>
                  <th style={{ padding: '14px 12px' }}>Mã bài</th>
                  <th style={{ padding: '14px 12px' }}>Ảnh & Tiêu đề bài viết</th>
                  <th style={{ padding: '14px 12px' }}>Chuyên đề</th>
                  <th style={{ padding: '14px 12px' }}>Lượt xem</th>
                  <th style={{ padding: '14px 12px' }}>Trạng thái</th>
                  <th style={{ padding: '14px 12px', textAlign: 'right' }}>Hành động nghiệp vụ</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1ece1' }}>
                    <td style={{ padding: '14px 12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>#{p.id}</td>
                    <td style={{ padding: '14px 12px', maxWidth: '340px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={p.coverImage} alt={p.title} style={{ width: '50px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text-dark)', lineHeight: '1.3' }}>{p.title}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📅 {p.publishedDate} • ⏱️ {p.readTime}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ background: '#f4efe6', padding: '4px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: '600' }}>
                        {p.categoryName}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px' }}>👁️ {p.views}</td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: p.status === 'published' ? '#ecfdf5' : '#fef2f2',
                        color: p.status === 'published' ? '#065f46' : '#991b1b'
                      }}>
                        {p.status === 'published' ? '● Đang hiển thị' : '○ Đang ẩn'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      {/* Nút Ẩn / Hiện */}
                      <button
                        onClick={() => togglePostVisibility(p.id)}
                        style={{ marginRight: '6px', padding: '6px 10px', fontSize: '0.8rem', background: '#f4efe6', borderRadius: '4px' }}
                        title="Bật / Tắt trạng thái ẩn hiện"
                      >
                        {p.status === 'published' ? '👁️ Ẩn' : '🔓 Hiện'}
                      </button>
                      {/* Nút Sửa */}
                      <button
                        onClick={() => openEditPostModal(p)}
                        style={{ marginRight: '6px', padding: '6px 10px', fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px' }}
                        title="Chỉnh sửa nội dung bài viết"
                      >
                        ✏️ Sửa
                      </button>
                      {/* Nút Xóa */}
                      <button
                        onClick={() => { if (confirm(`Xác nhận xóa bài viết "${p.title}"?`)) deletePost(p.id); }}
                        style={{ padding: '6px 10px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}
                        title="Xóa bài viết"
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phân trang Bài viết trong Admin */}
          {totalPostPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
              {Array.from({ length: totalPostPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setPostPage(page)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-cream)',
                    background: postPage === page ? 'var(--text-dark)' : '#ffffff',
                    color: postPage === page ? '#ffffff' : 'var(--text-dark)',
                    fontWeight: '700'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================
          TAB 2: QUẢN LÝ DANH MỤC (Thêm, Sửa, Xóa danh mục)
          =================================================== */}
      {activeTab === 'categories' && (
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-cream)', padding: '28px' }}>
          {/* Form thêm danh mục mới */}
          <form onSubmit={handleCreateCategory} style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <input
              type="text"
              required
              placeholder="Nhập tên danh mục mới (ví dụ: Mobile Dev, Cybersecurity)..."
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              style={{ flex: 1, minWidth: '260px', padding: '10px 16px', border: '1px solid var(--border-cream)', borderRadius: '9999px' }}
            />
            <input
              type="text"
              placeholder="Icon (ví dụ: 📱)"
              value={newCatIcon}
              onChange={(e) => setNewCatIcon(e.target.value)}
              style={{ width: '80px', padding: '10px 12px', border: '1px solid var(--border-cream)', borderRadius: '9999px', textAlign: 'center' }}
            />
            <button type="submit" className="btn-pill btn-pill-gold">
              ➕ Thêm Danh Mục
            </button>
          </form>

          {/* Categories Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-cream)', borderBottom: '2px solid var(--border-cream)' }}>
                <th style={{ padding: '14px 12px' }}>Biểu tượng</th>
                <th style={{ padding: '14px 12px' }}>Mã Danh Mục</th>
                <th style={{ padding: '14px 12px' }}>Tên Danh Mục</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(c => c.id !== 'all').map(cat => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f1ece1' }}>
                  <td style={{ padding: '14px 12px', fontSize: '1.2rem' }}>{cat.icon}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{cat.id}</td>
                  <td style={{ padding: '14px 12px', fontWeight: 'bold' }}>
                    {editingCatId === cat.id ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={editCatName}
                          onChange={(e) => setEditCatName(e.target.value)}
                          style={{ padding: '4px 8px', border: '1px solid var(--border-cream)', borderRadius: '4px' }}
                        />
                        <button
                          onClick={() => handleSaveEditCategory(cat.id)}
                          style={{ padding: '4px 8px', background: 'var(--accent-gold)', borderRadius: '4px', fontWeight: 'bold' }}
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setEditingCatId(null)}
                          style={{ padding: '4px 8px', background: '#e2e8f0', borderRadius: '4px' }}
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    {editingCatId !== cat.id && (
                      <button
                        onClick={() => { setEditingCatId(cat.id); setEditCatName(cat.name); }}
                        style={{ marginRight: '8px', padding: '6px 12px', fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px' }}
                      >
                        ✏️ Sửa
                      </button>
                    )}
                    <button
                      onClick={() => { if (confirm(`Xác nhận xóa danh mục ${cat.name}?`)) deleteCategory(cat.id); }}
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===================================================
          TAB 3: QUẢN LÝ TÀI KHOẢN (Xem, Thêm Admin/User, Sửa, Xóa)
          =================================================== */}
      {activeTab === 'users' && (
        <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-cream)', padding: '28px' }}>
          {/* Controls: Search & Filter Role */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm tài khoản theo tên hoặc email..."
              value={userSearch}
              onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
              style={{ padding: '10px 18px', border: '1px solid var(--border-cream)', borderRadius: '9999px', flex: '1', minWidth: '260px' }}
            />

            <select
              value={userRoleFilter}
              onChange={(e) => { setUserRoleFilter(e.target.value); setUserPage(1); }}
              style={{ padding: '10px 16px', border: '1px solid var(--border-cream)', borderRadius: '9999px', outline: 'none' }}
            >
              <option value="all">Tất cả vai trò ({users.length})</option>
              <option value="admin">Quản trị viên (Admin)</option>
              <option value="user">Người dùng thường (User)</option>
            </select>
          </div>

          {/* Users Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-cream)', borderBottom: '2px solid var(--border-cream)' }}>
                <th style={{ padding: '14px 12px' }}>Tài khoản</th>
                <th style={{ padding: '14px 12px' }}>Vai trò</th>
                <th style={{ padding: '14px 12px' }}>Số điện thoại</th>
                <th style={{ padding: '14px 12px' }}>Địa chỉ liên hệ</th>
                <th style={{ padding: '14px 12px', textAlign: 'right' }}>Hành động nghiệp vụ</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f1ece1' }}>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={u.avatar} alt={u.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ display: 'block', color: 'var(--text-dark)' }}>{u.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: u.role === 'admin' ? '#eff6ff' : '#f4efe6',
                      color: u.role === 'admin' ? '#1d4ed8' : '#55585d'
                    }}>
                      {u.role === 'admin' ? '🛡️ Quản trị viên (Admin)' : '👤 Người dùng (User)'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>{u.phone || 'Chưa cập nhật'}</td>
                  <td style={{ padding: '14px 12px' }}>{u.address || 'Chưa cập nhật'}</td>
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    <button
                      onClick={() => openEditUserModal(u)}
                      style={{ marginRight: '6px', padding: '6px 12px', fontSize: '0.8rem', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px' }}
                      title="Sửa thông tin hoặc đổi mật khẩu"
                    >
                      ✏️ Sửa
                    </button>
                    {u.id !== currentUser.id && (
                      <button
                        onClick={() => { if (confirm(`Xác nhận xóa tài khoản "${u.name}"?`)) deleteUser(u.id); }}
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px' }}
                        title="Xóa tài khoản khỏi hệ thống"
                      >
                        🗑️ Xóa
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang Users */}
          {totalUserPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
              {Array.from({ length: totalUserPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setUserPage(page)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-cream)',
                    background: userPage === page ? 'var(--text-dark)' : '#ffffff',
                    color: userPage === page ? '#ffffff' : 'var(--text-dark)',
                    fontWeight: '700'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================================================
          MODAL: THÊM / SỬA BÀI VIẾT
          =================================================== */}
      {showPostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '680px', borderRadius: '12px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
                {editingPostId ? '✏️ CHỈNH SỬA BÀI VIẾT' : '➕ THÊM BÀI VIẾT MỚI'}
              </h2>
              <button onClick={() => setShowPostModal(false)} style={{ fontSize: '1.4rem' }}>✕</button>
            </div>

            <form onSubmit={handleSavePost}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tối ưu hiệu năng React 18 với useMemo"
                  className="search-input-box"
                  value={postFormData.title}
                  onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Chuyên đề bài viết *</label>
                  <select
                    value={postFormData.category}
                    onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-cream)' }}
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Trạng thái *</label>
                  <select
                    value={postFormData.status}
                    onChange={(e) => setPostFormData({ ...postFormData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-cream)' }}
                  >
                    <option value="published">Đang hiển thị (Published)</option>
                    <option value="hidden">Ẩn bài viết (Hidden)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Đường dẫn ảnh bìa (Cover Image URL)</label>
                <input
                  type="text"
                  className="search-input-box"
                  value={postFormData.coverImage}
                  onChange={(e) => setPostFormData({ ...postFormData, coverImage: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Tóm tắt ngắn (Excerpt) *</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Tóm tắt ngắn gọn bài viết để hiển thị trên thẻ..."
                  className="search-input-box"
                  style={{ borderRadius: '8px' }}
                  value={postFormData.excerpt}
                  onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Nội dung chi tiết *</label>
                <textarea
                  required
                  rows="6"
                  placeholder="Nhập toàn bộ nội dung chi tiết bài viết..."
                  className="search-input-box"
                  style={{ borderRadius: '8px' }}
                  value={postFormData.content}
                  onChange={(e) => setPostFormData({ ...postFormData, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-pill btn-pill-outline" onClick={() => setShowPostModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-pill btn-pill-gold">
                  {editingPostId ? 'Lưu Thay Đổi' : 'Đăng Bài Viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================
          MODAL: THÊM / SỬA TÀI KHOẢN (USER & ADMIN)
          =================================================== */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '600px', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>
                {editingUserId ? '✏️ SỬA THÔNG TIN TÀI KHOẢN' : '➕ THÊM TÀI KHOẢN MỚI'}
              </h2>
              <button onClick={() => setShowUserModal(false)} style={{ fontSize: '1.4rem' }}>✕</button>
            </div>

            <form onSubmit={handleSaveUser}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Họ và tên *</label>
                  <input
                    type="text"
                    required
                    className="search-input-box"
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Email đăng nhập *</label>
                  <input
                    type="email"
                    required
                    disabled={!!editingUserId}
                    className="search-input-box"
                    style={{ background: editingUserId ? '#f1f5f9' : '#fff' }}
                    value={userFormData.email}
                    onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Vai trò hệ thống *</label>
                  <select
                    value={userFormData.role}
                    onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-cream)' }}
                  >
                    <option value="user">Người dùng thông thường (User)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Số điện thoại</label>
                  <input
                    type="tel"
                    className="search-input-box"
                    value={userFormData.phone}
                    onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>Địa chỉ liên hệ</label>
                <input
                  type="text"
                  className="search-input-box"
                  value={userFormData.address}
                  onChange={(e) => setUserFormData({ ...userFormData, address: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '0.88rem' }}>
                  {editingUserId ? 'Mật khẩu mới (Để trống nếu giữ nguyên)' : 'Mật khẩu khởi tạo *'}
                </label>
                <input
                  type="password"
                  required={!editingUserId}
                  placeholder="Nhập mật khẩu..."
                  className="search-input-box"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-pill btn-pill-outline" onClick={() => setShowUserModal(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-pill btn-pill-gold">
                  {editingUserId ? 'Lưu Thông Tin' : 'Tạo Tài Khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
