import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPosts, blogCategories, initialUsers } from '../data/blogData';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  // 1. Quản lý Posts với LocalStorage persistence
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('devblog_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  // 2. Quản lý Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('devblog_categories');
    return saved ? JSON.parse(saved) : blogCategories;
  });

  // 3. Quản lý Users (Cả User thường & Admin)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('devblog_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // 4. Quản lý Current User (Phiên đăng nhập)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('devblog_current_user');
    if (saved) return JSON.parse(saved);
    return initialUsers[0]; // Mặc định là Admin để dễ dàng trải nghiệm và chấm bài
  });

  // Đồng bộ LocalStorage
  useEffect(() => {
    localStorage.setItem('devblog_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('devblog_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('devblog_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('devblog_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('devblog_current_user');
    }
  }, [currentUser]);

  // ==================== LUỒNG NGHIỆP VỤ AUTH ====================
  const login = (email, password) => {
    const found = users.find(u => u.email === email);
    if (!found) return { success: false, message: 'Email không tồn tại trong hệ thống!' };
    // Ở demo kiểm tra cơ bản
    setCurrentUser(found);
    return { success: true, user: found };
  };

  const register = (userData) => {
    const existing = users.find(u => u.email === userData.email);
    if (existing) return { success: false, message: 'Email này đã được đăng ký!' };

    const newUser = {
      id: Date.now(),
      username: userData.email.split('@')[0],
      name: userData.name,
      email: userData.email,
      role: 'user',
      birthYear: userData.birthYear || '2000',
      phone: userData.phone || '',
      address: userData.address || '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // ==================== LUỒNG BÌNH LUẬN ====================
  const addComment = (postId, commentText) => {
    if (!currentUser) return { success: false, message: 'Vui lòng đăng nhập để bình luận!' };
    
    const newComment = {
      id: Date.now(),
      author: currentUser.name,
      userId: currentUser.id,
      avatar: currentUser.avatar,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content: commentText
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [newComment, ...(p.comments || [])]
          };
        }
        return p;
      })
    );
    return { success: true };
  };

  const deleteComment = (postId, commentId) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments.filter(c => c.id !== commentId)
          };
        }
        return p;
      })
    );
  };

  // ==================== LUỒNG QUẢN LÝ TÀI KHOẢN (USER & ADMIN) ====================
  const updateUserProfile = (updatedData) => {
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, ...updatedData } : u))
    );
  };

  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      username: userData.email.split('@')[0],
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
      birthYear: userData.birthYear || '2000',
      phone: userData.phone || '',
      address: userData.address || '',
      avatar: userData.role === 'admin' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const editUser = (userId, updatedData) => {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, ...updatedData } : u))
    );
    if (currentUser?.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }
  };

  const deleteUser = (userId) => {
    if (currentUser?.id === userId) {
      alert('Không thể tự xóa tài khoản đang đăng nhập!');
      return false;
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    return true;
  };

  // ==================== LUỒNG QUẢN TRỊ BÀI VIẾT (ADMIN) ====================
  const addPost = (newPostData) => {
    const newPost = {
      id: Date.now(),
      ...newPostData,
      slug: newPostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      author: {
        name: currentUser ? currentUser.name : 'Ban Biên Tập',
        avatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: currentUser?.role === 'admin' ? 'Quản Trị Viên' : 'Tác Giả'
      },
      publishedDate: new Date().toISOString().substring(0, 10),
      views: 0,
      likes: 0,
      comments: []
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const editPost = (postId, updatedData) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, ...updatedData } : p))
    );
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const togglePostVisibility = (postId) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const nextStatus = p.status === 'published' ? 'hidden' : 'published';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // ==================== LUỒNG QUẢN TRỊ DANH MỤC (ADMIN) ====================
  const addCategory = (name, icon = '📁') => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setCategories(prev => [...prev, { id, name, icon }]);
  };

  const editCategory = (catId, newName, newIcon = '📁') => {
    setCategories(prev =>
      prev.map(c => (c.id === catId ? { ...c, name: newName, icon: newIcon } : c))
    );
  };

  const deleteCategory = (catId) => {
    if (catId === 'all') {
      alert('Không thể xóa danh mục mặc định!');
      return false;
    }
    setCategories(prev => prev.filter(c => c.id !== catId));
    return true;
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        users,
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        addComment,
        deleteComment,
        updateUserProfile,
        addUser,
        editUser,
        deleteUser,
        addPost,
        editPost,
        deletePost,
        togglePostVisibility,
        addCategory,
        editCategory,
        deleteCategory
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  return useContext(BlogContext);
}
