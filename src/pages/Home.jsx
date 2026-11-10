import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/home.css';

export default function Home() {
  const { posts } = useBlog();
  const { t } = useLanguage();
  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <div className="naferior-homepage">
      {/* ===================================================
          1. HERO SECTION (DARK CHARCOAL BACKGROUND)
          =================================================== */}
      <section className="naferior-hero">
        <div className="container naferior-hero-inner">
          {/* GIANT CONDENSED HEADLINE */}
          <h1 className="hero-giant-title">
            {t('heroTitleLine1')} <br />
            <span className="gold-beige-text">{t('heroTitleLine2')}</span>
          </h1>

          {/* LOWER GRID: SOCIAL + CTA + PARAGRAPH vs TILTED POLAROID */}
          <div className="hero-lower-grid">
            {/* Left Column: Social Links + Explore Blogs CTA + Paragraph */}
            <div className="hero-left-col">
              <div className="hero-social-line">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" title="Facebook">f</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" title="Instagram">ig</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="social-icon-btn" title="X (Twitter)">𝕏</a>
              </div>

              <div className="hero-text-content">
                <div className="hero-wireframe-lines"></div>
                <Link to="/blogs" className="btn-pill btn-pill-gold hero-contact-btn">
                  {t('heroBtn')}
                </Link>
                <p className="hero-brief-desc">
                  {t('heroDesc')}
                </p>
              </div>
            </div>

            {/* Right Column: Tilted Polaroid Artwork (Developer Workspace) */}
            <div className="hero-polaroids-composition">
              {/* Back Layered Polaroid */}
              <div className="polaroid-card-back">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80" 
                  alt="Modern Retro Tech Setup" 
                />
              </div>

              {/* Front Main Polaroid (tilted -4.5deg) with Workspace Photo & Arrow Button */}
              <div className="polaroid-card-main">
                <div className="polaroid-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80" 
                    alt="Aesthetic Coding Workspace" 
                  />
                  <Link to="/blogs" className="arrow-circle-btn" title={t('heroBtn')}>
                    ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          2. SECTION: WE DO FRONTEND, BACKEND & CLOUD ARCHITECTURE
          =================================================== */}
      <section className="naferior-projects-sec">
        <div className="container">
          <h2 className="section-bold-title">
            {t('sec2Title')}
          </h2>

          <div className="projects-three-grid">
            {/* Card 1: Frontend Roadmap 2026 */}
            <Link to="/blog/1" className="project-feature-card">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80" 
                alt="Frontend Roadmap 2026" 
              />
              <div className="project-card-overlay">
                <h4 className="project-title">{t('card1Title')}</h4>
                <span className="project-subtitle">{t('card1Sub')}</span>
              </div>
            </Link>

            {/* Card 2: Generative AI in Action */}
            <Link to="/blog/2" className="project-feature-card">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=80" 
                alt="Generative AI Revolution" 
              />
              <div className="project-card-overlay">
                <h4 className="project-title">{t('card2Title')}</h4>
                <span className="project-subtitle">{t('card2Sub')}</span>
              </div>
            </Link>

            {/* Card 3: Container & Docker Flow */}
            <Link to="/blog/3" className="project-feature-card">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80" 
                alt="Docker & Containers" 
              />
              <div className="project-card-overlay">
                <h4 className="project-title">{t('card3Title')}</h4>
                <span className="project-subtitle">{t('card3Sub')}</span>
              </div>
            </Link>
          </div>

          {/* Action Row */}
          <div className="projects-action-row">
            <Link to="/about-us" className="btn-pill btn-pill-outline">
              {t('btnAboutTeam')}
            </Link>
            <Link to="/blogs" className="btn-pill btn-pill-dark">
              {t('btnViewAll')} ({publishedPosts.length})
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          3. SECTION: STATS & WHAT WE'RE DOING WITH TECH BLOG
          =================================================== */}
      <section className="naferior-services-sec">
        <div className="container">
          {/* Top Stats Bar */}
          <div className="stats-counter-strip">
            <div className="stat-counter-box">
              <span className="stat-big-num">150+</span>
              <span className="stat-label-text">{t('statArticles')}</span>
            </div>
            <div className="stat-counter-box">
              <span className="stat-big-num">100+</span>
              <span className="stat-label-text">{t('statWriters')}</span>
            </div>
            <div className="stat-counter-box">
              <span className="stat-big-num">200+</span>
              <span className="stat-label-text">{t('statRepos')}</span>
            </div>
            <div className="stat-counter-box">
              <span className="stat-big-num">100%</span>
              <span className="stat-label-text">{t('statQuality')}</span>
            </div>
          </div>

          {/* Dual Layout: Intro vs Topic Categories */}
          <div className="services-dual-layout">
            <div className="services-left-intro">
              <h2>{t('sec3Title')}</h2>
              <p>{t('sec3Desc')}</p>
              <Link to="/blogs" className="btn-pill btn-pill-dark" style={{ padding: '9px 24px', fontSize: '0.85rem' }}>
                {t('sec3Btn')}
              </Link>
            </div>

            <div className="services-right-list">
              <div className="service-item-row">
                <span className="service-name">{t('srv1Title')}</span>
                <span className="service-desc">{t('srv1Desc')}</span>
              </div>

              <div className="service-item-row">
                <span className="service-name">{t('srv2Title')}</span>
                <span className="service-desc">{t('srv2Desc')}</span>
              </div>

              <div className="service-item-row">
                <span className="service-name">{t('srv3Title')}</span>
                <span className="service-desc">{t('srv3Desc')}</span>
              </div>

              <div className="service-item-row">
                <span className="service-name">{t('srv4Title')}</span>
                <span className="service-desc">{t('srv4Desc')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          4. SECTION: THE JOURNEY OF OUR DEVELOPER EMPIRE
          =================================================== */}
      <section className="naferior-story-sec">
        <div className="container">
          <div className="story-header-wrap">
            <span className="story-badge-tag">
              <span className="dot"></span> {t('storyTag')}
            </span>
            <h2 className="story-main-title">
              {t('storyTitle')}
            </h2>
            <p className="story-body-quote">
              {t('storyQuote')}
            </p>
            <Link to="/about-us" className="btn-pill btn-pill-outline" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
              {t('storyBtn')}
            </Link>
          </div>

          {/* 5-Image Gallery Grid */}
          <div className="story-gallery-composition">
            <div className="gallery-subgrid-left">
              <div className="gallery-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=80" 
                  alt="Code on Laptop Screen" 
                />
                <div className="gallery-photo-overlay">
                  <h5>{t('gal1Title')}</h5>
                  <span>{t('gal1Sub')}</span>
                </div>
              </div>

              <div className="gallery-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80" 
                  alt="Mechanical Keyboard Setup" 
                />
                <div className="gallery-photo-overlay">
                  <h5>{t('gal2Title')}</h5>
                  <span>{t('gal2Sub')}</span>
                </div>
              </div>

              <div className="gallery-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80" 
                  alt="UI UX Wireframing" 
                />
                <div className="gallery-photo-overlay">
                  <h5>{t('gal3Title')}</h5>
                  <span>{t('gal3Sub')}</span>
                </div>
              </div>

              <div className="gallery-photo-card">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80" 
                  alt="Team Collaboration" 
                />
                <div className="gallery-photo-overlay">
                  <h5>{t('gal4Title')}</h5>
                  <span>{t('gal4Sub')}</span>
                </div>
              </div>
            </div>

            {/* Tall Vertical Image on the Right */}
            <div className="gallery-photo-card tall">
              <img 
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80" 
                alt="Developer Working in Modern Studio" 
              />
              <div className="gallery-photo-overlay">
                <h5>{t('gal5Title')}</h5>
                <span>{t('gal5Sub')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          5. SECTION: WHAT OUR READERS SAY
          =================================================== */}
      <section className="naferior-reviews-sec">
        <div className="container">
          <div className="reviews-header-row">
            <h2>{t('revTitle')}</h2>
            <p>{t('revDesc')}</p>
          </div>

          <div className="reviews-cards-grid">
            {/* Review 1 */}
            <div className="dark-review-card">
              <div>
                <div className="review-stars">★★★★★</div>
                <p className="review-quote-text">
                  {t('rev1Quote')}
                </p>
              </div>
              <div className="reviewer-meta">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Rory Williamson" 
                  className="reviewer-avatar" 
                />
                <div className="reviewer-info">
                  <h6>Rory Williamson</h6>
                  <span>{t('rev1Role')}</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="dark-review-card">
              <div>
                <div className="review-stars">★★★★★</div>
                <p className="review-quote-text">
                  {t('rev2Quote')}
                </p>
              </div>
              <div className="reviewer-meta">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Alex Tahmid" 
                  className="reviewer-avatar" 
                />
                <div className="reviewer-info">
                  <h6>Alex Tahmid</h6>
                  <span>{t('rev2Role')}</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="dark-review-card">
              <div>
                <div className="review-stars">★★★★★</div>
                <p className="review-quote-text">
                  {t('rev3Quote')}
                </p>
              </div>
              <div className="reviewer-meta">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" 
                  alt="Kaisa Salman" 
                  className="reviewer-avatar" 
                />
                <div className="reviewer-info">
                  <h6>Kaisa Salman</h6>
                  <span>{t('rev3Role')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
