import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { currentUser, setCurrentUser, users } = useBlog();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleSwitchUser = (user) => {
    setCurrentUser(user);
    setUserDropdownOpen(false);
  };

  return (
    <header className="naferior-navbar">
      <div className="container nav-content-wrap">
        {/* Brand Logo Box: NAFERIOR */}
        <Link to="/" className="naferior-logo-box" onClick={closeMenu}>
          <span className="logo-text">NAFERIOR</span>
        </Link>

        {/* Center Nav Links */}
        <nav className={`naferior-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
            end
          >
            {t('navHome')}
          </NavLink>
          <NavLink 
            to="/about-us" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
          >
            {t('navAbout')}
          </NavLink>
          <NavLink 
            to="/blogs" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
          >
            {t('navBlogs')}
          </NavLink>
          <NavLink 
            to="/blogs?category=backend" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
          >
            {t('navServices')}
          </NavLink>
          <NavLink 
            to="/blogs?category=frontend" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
          >
            {t('navProjects')}
          </NavLink>
          <NavLink 
            to="/admin" 
            className={({ isActive }) => isActive ? 'naferior-link active' : 'naferior-link'}
            onClick={closeMenu}
          >
            {t('navAdmin')}
          </NavLink>
        </nav>

        {/* Right Actions: Language Switcher + User/Sign Up */}
        <div className="naferior-actions">
          {/* Language Selector Switcher */}
          <div className="lang-switcher-pill" title="Chọn ngôn ngữ / Select language">
            <button
              className={`lang-btn ${language === 'vi' ? 'active' : ''}`}
              onClick={() => setLanguage('vi')}
            >
              🇻🇳 VI
            </button>
            <span className="lang-divider">|</span>
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              🇬🇧 EN
            </button>
          </div>

          {currentUser ? (
            <div className="naferior-user-menu">
              <button 
                className="user-pill-btn" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
                <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                <span className="user-badge">{currentUser.role === 'admin' ? 'ADMIN' : 'USER'}</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-popover">
                  <div className="popover-user-info">
                    <strong>{currentUser.name}</strong>
                    <small>{currentUser.email}</small>
                  </div>
                  <ul className="popover-links">
                    <li><Link to="/profile" onClick={closeMenu}>👤 {t('manageAccount')}</Link></li>
                    {currentUser.role === 'admin' && (
                      <li><Link to="/admin" onClick={closeMenu}>⚙️ {t('adminDashboard')}</Link></li>
                    )}
                    <li className="divider"></li>
                    <li className="switch-label">{t('switchAccount')}</li>
                    {users.map(u => (
                      <li key={u.id}>
                        <button className="switch-acc-btn" onClick={() => handleSwitchUser(u)}>
                          {u.role === 'admin' ? '🛡️' : '👤'} {u.name} ({u.role.toUpperCase()})
                        </button>
                      </li>
                    ))}
                    <li className="divider"></li>
                    <li>
                      <button className="logout-link" onClick={() => { setCurrentUser(null); closeMenu(); }}>
                        🚪 {t('logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="signup-pill-btn">
              {t('signUp')}
            </Link>
          )}

          <button 
            className="mobile-hamburger" 
            onClick={toggleMobileMenu} 
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
