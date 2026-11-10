import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="naferior-footer">
      <div className="container footer-inner-grid">
        <div className="footer-brand-box">
          <div className="footer-logo">
            <span className="logo-border">NAFERIOR</span>
          </div>
          <p className="footer-tagline">
            {t('footerTagline')}
          </p>
          <div className="footer-social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <span>•</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <span>•</span>
            <a href="https://x.com" target="_blank" rel="noreferrer">Twitter / X</a>
            <span>•</span>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>

        <div className="footer-col-nav">
          <h5 className="footer-col-title">{t('footerNavTitle')}</h5>
          <ul className="footer-list">
            <li><Link to="/">{t('navHome')}</Link></li>
            <li><Link to="/about-us">{t('navAbout')}</Link></li>
            <li><Link to="/blogs">{t('navBlogs')}</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">{t('navAdmin')}</Link></li>
          </ul>
        </div>

        <div className="footer-col-nav">
          <h5 className="footer-col-title">{t('footerTopicTitle')}</h5>
          <ul className="footer-list">
            <li><Link to="/blogs?category=frontend">Frontend & React</Link></li>
            <li><Link to="/blogs?category=backend">Backend & NodeJS</Link></li>
            <li><Link to="/blogs?category=ai-data">AI & Machine Learning</Link></li>
            <li><Link to="/blogs?category=devops">DevOps & Docker</Link></li>
            <li><Link to="/blogs?category=career">Career & Mindset</Link></li>
          </ul>
        </div>

        <div className="footer-col-nav">
          <h5 className="footer-col-title">{t('footerAcademicTitle')}</h5>
          <p className="academic-desc">
            <strong>{t('footerCourse')}</strong><br/>
            <strong>{t('footerProject')}</strong><br/>
            <strong>{t('footerGroup')}</strong><br/>
            <span>Frontend: ReactJS 18 + Vite 6 + React Router v6</span><br/>
            <span>UI Theme: NAFERIOR Modern Architecture</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container bottom-bar-flex">
          <span>{t('footerRights')}</span>
          <span>{t('footerSubject')}</span>
        </div>
      </div>
    </footer>
  );
}
