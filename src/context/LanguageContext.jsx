import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  vi: {
    // Navbar
    navHome: 'TRANG CHỦ',
    navAbout: 'VỀ CHÚNG TÔI',
    navBlogs: 'BÀI VIẾT & TRANG',
    navServices: 'CHUYÊN ĐỀ',
    navProjects: 'DỰ ÁN',
    navAdmin: 'QUẢN TRỊ (ADMIN)',
    signUp: 'ĐĂNG KÝ',
    manageAccount: 'Quản lý tài khoản',
    adminDashboard: 'Bảng Quản Trị Admin',
    switchAccount: 'Đổi tài khoản kiểm thử:',
    logout: 'Đăng xuất',

    // Hero
    heroTitleLine1: 'ĐỌC NHỮNG CÂU CHUYỆN',
    heroTitleLine2: 'CÔNG NGHỆ & LẬP TRÌNH TRUYỀN CẢM HỨNG',
    heroBtn: 'KHÁM PHÁ TẤT CẢ BÀI VIẾT',
    heroDesc: 'Từ các khái niệm lập trình nền tảng đến triển khai thực tế trên production, đội ngũ kỹ sư phần mềm của chúng tôi mang đến những bài hướng dẫn chuyên sâu, kiến trúc hệ thống và lộ trình phát triển để định hình hành trình công nghệ của bạn.',

    // Section 2: Three Cards
    sec2Title: 'CHÚNG TÔI NÓI VỀ FRONTEND, BACKEND & KIẾN TRÚC HỆ THỐNG',
    card1Title: 'LỘ TRÌNH FRONTEND 2026',
    card1Sub: 'Kiến trúc React 18 & Vite',
    card2Title: 'KỶ NGUYÊN GENERATIVE AI',
    card2Sub: 'Trí tuệ nhân tạo trong ứng dụng Web',
    card3Title: 'DOCKER & QUY TRÌNH CONTAINER',
    card3Sub: 'DevOps & Vận hành không gián đoạn',
    btnAboutTeam: 'VỀ NHÓM TÁC GIẢ',
    btnViewAll: 'XEM TẤT CẢ BÀI VIẾT',

    // Section 3: Stats & Services
    statArticles: 'Bài viết đã xuất bản',
    statWriters: 'Tác giả công nghệ năng động',
    statRepos: 'Mã nguồn mở chia sẻ',
    statQuality: 'Thẩm định chất lượng 100%',
    sec3Title: 'TÌM HIỂU NHỮNG GÌ CHÚNG TÔI LÀM TẠI DEVLOG',
    sec3Desc: 'Chúng tôi sở hữu kiến thức kỹ thuật chuyên sâu và kinh nghiệm triển khai thực chiến trong mọi mảng phát triển web hiện đại.',
    sec3Btn: 'BẮT ĐẦU ĐỌC NGAY',
    srv1Title: 'LÀM CHỦ FRONTEND :',
    srv1Desc: 'Đi sâu vào React 18, kiến trúc Vite, định tuyến Client-side, hooks và tối ưu hiệu năng chỉ số Web Vitals.',
    srv2Title: 'THIẾT KẾ BACKEND API :',
    srv2Desc: 'Xây dựng RESTful API kiên cố, dịch vụ NodeJS/Express, xác thực bảo mật JWT và kiến trúc microservices mở rộng.',
    srv3Title: 'DOCKER & DEVOPS ĐÁM MÂY :',
    srv3Desc: 'Đóng gói Docker đa giai đoạn (multi-stage), điều phối docker-compose, kiểm thử tự động CI/CD và triển khai thực tế.',
    srv4Title: 'THIẾT KẾ HỆ THỐNG & SỰ NGHIỆP :',
    srv4Desc: 'Khung tư duy giải quyết vấn đề thuật toán, chiến lược phỏng vấn kỹ thuật và xây dựng tư duy kỹ sư cấp cao.',

    // Section 4: Story
    storyTag: 'Câu Chuyện Của Chúng Tôi',
    storyTitle: 'TỪ NHỮNG CUỘC TRÒ CHUYỆN BÌNH DỊ ĐẾN NHỮNG BÀI VIẾT KINH ĐIỂN: HÀNH TRÌNH CỘNG ĐỒNG CÔNG NGHỆ',
    storyQuote: '"Naferior Blog" ra đời từ những buổi thức đêm lập trình tại phòng máy tính trường đại học. Được gắn kết bởi niềm đam mê mã nguồn sạch và tri thức mở, nhóm học tập không chính thức ấy đã phát triển—qua sự thử nghiệm, sáng tạo và tinh thần kỹ sư kiên trì—thành một tạp chí công nghệ được độc giả trên khắp nơi theo dõi.',
    storyBtn: 'TÌM HIỂU THÊM VỀ CHÚNG TÔI',
    gal1Title: 'TAY NGHỀ LẬP TRÌNH',
    gal1Sub: 'Viết component React tinh gọn',
    gal2Title: 'CẢM GIÁC GÕ PHÍM',
    gal2Sub: 'Công thái học & năng suất lập trình viên',
    gal3Title: 'KIẾN TRÚC TRỰC QUAN',
    gal3Sub: 'Hiện thực hóa thiết kế từ Figma sang mã nguồn',
    gal4Title: 'ĐÁNH GIÁ CHÉO (PEER REVIEW)',
    gal4Sub: 'Dự án nguồn mở cộng tác nhóm',
    gal5Title: 'TẬP TRUNG CHUYÊN SÂU',
    gal5Sub: 'Xây dựng các hệ thống số kiên cường',

    // Section 5: Reviews
    revTitle: 'ĐỘC GIẢ NÓI GÌ VỀ CHÚNG TÔI',
    revDesc: 'Hãy xem các kỹ sư phần mềm, nhà thiết kế và sinh viên đọc blog của chúng tôi chia sẻ điều gì về các bài viết.',
    rev1Quote: '"Rất khác biệt so với các trang hướng dẫn thông thường, blog này có phong cách thẩm mỹ tuyệt đẹp, hành văn cô đọng và các ví dụ mã nguồn thực chiến sẵn sàng dùng ngay."',
    rev1Role: 'Kỹ sư Frontend Senior',
    rev2Quote: '"Để học React Router và cấu hình Vite hiện đại, đây là kho báu. Nhóm đại học của chúng tôi đã dùng chính kiến trúc này cho đồ án môn học."',
    rev2Role: 'Sinh viên Khoa học Máy tính',
    rev3Quote: '"Ngôn ngữ thiết kế phong cách tạp chí này thật sự mới mẻ so với các mẫu blog kiểu cũ. Nó giúp việc đọc các bài viết kỹ thuật dài trở nên vô cùng thư thái."',
    rev3Role: 'Nhà thiết kế UI/UX & Tác giả',

    // Footer
    footerTagline: 'Tạp chí Kiến trúc phần mềm, Thiết kế giao diện & Không gian sống công nghệ. Xây dựng môi trường chia sẻ tri thức từ năm 1999.',
    footerNavTitle: 'ĐIỀU HƯỚNG',
    footerTopicTitle: 'CHUYÊN ĐỀ & DỊCH VỤ',
    footerAcademicTitle: 'THÔNG TIN HỌC THUẬT',
    footerCourse: 'Môn học: Lập trình Web (LTW-2026)',
    footerProject: 'Đề tài: Xây dựng website dạng blog',
    footerGroup: 'Quy mô: 2 - 3 sinh viên',
    footerRights: '© 2026 NAFERIOR TECH BLOG. Đã đăng ký bản quyền.',
    footerSubject: 'BTH-1: ReactJS & Định tuyến Client-side Router',

    // Blog List Page
    blogListTitle: 'TẤT CẢ BÀI VIẾT CÔNG NGHỆ',
    blogListSub: 'Tìm kiếm kiến thức, phân loại theo chuyên đề và cập nhật xu hướng công nghệ',
    searchPlaceholder: 'Tìm theo tiêu đề hoặc nội dung...',
    categoriesTitle: 'Danh mục chủ đề',
    sortByLabel: 'Sắp xếp theo:',
    sortNewest: 'Mới nhất (Mặc định)',
    sortOldest: 'Cũ nhất',
    sortViews: 'Lượt xem nhiều nhất',
    sortLikes: 'Được yêu thích nhất',
    foundArticles: 'Tìm thấy',
    articlesMatching: 'bài viết phù hợp',
    pageText: 'Trang',
    prevPage: '← Trang trước',
    nextPage: 'Trang sau →',
    noArticlesFound: 'Không tìm thấy bài viết nào!',
    noArticlesSub: 'Hãy thử tìm kiếm từ khóa khác hoặc chuyển sang danh mục khác.',

    // Blog Detail & Comments
    commentsTitle: 'Bình luận',
    commentPlaceholder: 'Chia sẻ ý kiến hoặc câu hỏi của bạn về bài viết này...',
    sendComment: 'Gửi bình luận',
    loginToComment: 'Vui lòng đăng nhập tài khoản để có thể tham gia thảo luận và gửi bình luận.',
    loginNow: 'Đăng nhập ngay',
    noCommentsYet: 'Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ về bài viết!',
    publishedDateLabel: 'Ngày đăng:',
    viewsLabel: 'lượt xem',
    readTimeLabel: 'thời gian đọc',

    // Profile
    profileHeading: 'Quản Lý Thông Tin Tài Khoản',
    profileSub: 'Xem, cập nhật thông tin liên hệ và quản lý bảo mật tài khoản cá nhân',
    personalInfoTitle: '👤 Thông Tin Cá Nhân & Liên Hệ',
    fullName: 'Họ và tên *',
    birthYear: 'Năm sinh *',
    phone: 'Số điện thoại *',
    address: 'Địa chỉ liên hệ',
    saveProfileBtn: 'Lưu Thay Đổi Thông Tin',
    changePasswordTitle: '🔒 Đổi Mật Khẩu Tài Khoản',
    currentPassword: 'Mật khẩu hiện tại *',
    newPassword: 'Mật khẩu mới *',
    confirmPassword: 'Xác nhận mật khẩu mới *',
    changePasswordBtn: 'Cập Nhật Mật Khẩu',

    // Admin
    adminHeading: '⚙️ Bảng Điều Khiển Quản Trị (Admin Panel)',
    adminSub: 'Quản lý bài viết, danh mục, bình luận và người dùng hệ thống',
    addNewPostBtn: '➕ Thêm Bài Viết Mới',
    tabPosts: '📝 Quản Lý Bài Viết',
    tabCategories: '📁 Quản Lý Danh Mục',
    tabUsers: '👥 Quản Lý Người Dùng & Admin',
  },

  en: {
    // Navbar
    navHome: 'HOME',
    navAbout: 'ABOUT US',
    navBlogs: 'PAGES & BLOGS',
    navServices: 'SERVICES',
    navProjects: 'PROJECTS',
    navAdmin: 'ADMIN PANEL',
    signUp: 'SIGN UP',
    manageAccount: 'Manage Profile',
    adminDashboard: 'Admin Dashboard',
    switchAccount: 'Switch Test Account:',
    logout: 'Log Out',

    // Hero
    heroTitleLine1: 'READ YOUR INSPIRED',
    heroTitleLine2: 'TECH & DEV STORIES',
    heroBtn: 'EXPLORE ALL BLOGS',
    heroDesc: 'From foundational coding concepts to full-stack production deployment, our team of experienced software engineers brings you deep-dive tutorials, system architectures, and career roadmaps to craft your tech journey.',

    // Section 2: Three Cards
    sec2Title: 'WE COVER FRONTEND, BACKEND & SYSTEM ARCHITECTURE',
    card1Title: 'FRONTEND ROADMAP 2026',
    card1Sub: 'React 18 & Vite Architecture',
    card2Title: 'GENERATIVE AI REVOLUTION',
    card2Sub: 'Machine Learning in Web Apps',
    card3Title: 'CONTAINER & DOCKER FLOW',
    card3Sub: 'DevOps & Zero Downtime',
    btnAboutTeam: 'ABOUT OUR TEAM',
    btnViewAll: 'VIEW ALL ARTICLES',

    // Section 3: Stats & Services
    statArticles: 'Articles Published',
    statWriters: 'Active Tech Writers',
    statRepos: 'Open Code Repos',
    statQuality: 'Quality Peer-Reviewed',
    sec3Title: "FIND OUT WHAT WE'RE DOING WITH DEVLOG",
    sec3Desc: 'We have deep engineering knowledge and hands-on production experience across all modern areas of web development.',
    sec3Btn: "LET'S START READING",
    srv1Title: 'FRONTEND MASTERY :',
    srv1Desc: 'Deep dives into React 18, Vite architecture, client-side routing, hooks and Web Vitals performance optimization.',
    srv2Title: 'BACKEND API DESIGN :',
    srv2Desc: 'Structuring resilient RESTful APIs, NodeJS/Express services, JWT authentication, and scalable microservices.',
    srv3Title: 'DOCKER & CLOUD DEVOPS :',
    srv3Desc: 'Multi-stage Docker builds, docker-compose orchestration, CI/CD automated testing and container deployments.',
    srv4Title: 'SYSTEM DESIGN & CAREER :',
    srv4Desc: 'Algorithmic problem-solving frameworks, technical interview tactics and building a senior developer mindset.',

    // Section 4: Story
    storyTag: 'Our Story',
    storyTitle: 'FROM CASUAL CONVERSATIONS TO ICONIC ARTICLES: THE JOURNEY OF OUR TECH COMMUNITY',
    storyQuote: '"Naferior Blog" was born during late-night programming sessions at university computer labs. Sealed with a passion for clean code and open knowledge, that informal study group evolved—through experimentation, creativity, and a healthy dose of engineering grit—into an internationally read tech publication.',
    storyBtn: 'LEARN MORE ABOUT US',
    gal1Title: 'CODE CRAFTSMANSHIP',
    gal1Sub: 'Writing expressive React components',
    gal2Title: 'TACTILE TYPING',
    gal2Sub: 'Ergonomics & developer productivity',
    gal3Title: 'VISUAL ARCHITECTURE',
    gal3Sub: 'From Figma designs to code',
    gal4Title: 'PEER REVIEWS',
    gal4Sub: 'Collaborative open source projects',
    gal5Title: 'DEEP FOCUS WORK',
    gal5Sub: 'Building resilient digital systems',

    // Section 5: Reviews
    revTitle: 'WHAT OUR READERS SAY',
    revDesc: "Let's see what software engineers, designers, and students who read our blog have to say about the articles.",
    rev1Quote: '"Very different from conventional tutorial sites, this blog has stunning aesthetics, concise writing, and real production-ready code examples."',
    rev1Role: 'Senior Frontend Engineer',
    rev2Quote: '"For learning React Router and modern Vite setups, this is gold. Our university team used this exact architecture for our final project."',
    rev2Role: 'Computer Science Student',
    rev3Quote: '"The editorial design language is so refreshing compared to the old-school blog templates. It makes reading long-form tech posts effortless."',
    rev3Role: 'UI/UX Designer & Writer',

    // Footer
    footerTagline: 'Software Architecture, Interface Design & Digital Living Journal. Crafting open knowledge sharing environments since 1999.',
    footerNavTitle: 'NAVIGATION',
    footerTopicTitle: 'TOPICS & SERVICES',
    footerAcademicTitle: 'ACADEMIC PROJECT',
    footerCourse: 'Course: Web Programming (LTW-2026)',
    footerProject: 'Project: Blog Website Architecture',
    footerGroup: 'Team Size: 2 - 3 Students',
    footerRights: '© 2026 NAFERIOR TECH BLOG. All rights reserved.',
    footerSubject: 'BTH-1: ReactJS & Client-side Routing',

    // Blog List Page
    blogListTitle: 'ALL TECH STORIES & ARTICLES',
    blogListSub: 'Explore developer insights, filter by specialized domains, and keep pace with modern engineering',
    searchPlaceholder: 'Search by article title or content...',
    categoriesTitle: 'Topic Categories',
    sortByLabel: 'Sort by:',
    sortNewest: 'Newest (Default)',
    sortOldest: 'Oldest',
    sortViews: 'Most Viewed',
    sortLikes: 'Most Appreciated',
    foundArticles: 'Found',
    articlesMatching: 'matching articles',
    pageText: 'Page',
    prevPage: '← Previous',
    nextPage: 'Next →',
    noArticlesFound: 'No articles found matching your criteria!',
    noArticlesSub: 'Try searching with different keywords or switch to another topic category.',

    // Blog Detail & Comments
    commentsTitle: 'Comments',
    commentPlaceholder: 'Share your perspective or ask questions about this article...',
    sendComment: 'Post Comment',
    loginToComment: 'Please sign in to participate in the discussion and post comments.',
    loginNow: 'Sign In Now',
    noCommentsYet: 'No comments yet. Be the first to share your perspective on this article!',
    publishedDateLabel: 'Published:',
    viewsLabel: 'views',
    readTimeLabel: 'reading time',

    // Profile
    profileHeading: 'User Account Profile',
    profileSub: 'Review and update contact details and manage your account security credentials',
    personalInfoTitle: '👤 Personal & Contact Information',
    fullName: 'Full Name *',
    birthYear: 'Birth Year *',
    phone: 'Phone Number *',
    address: 'Contact Address',
    saveProfileBtn: 'Save Profile Changes',
    changePasswordTitle: '🔒 Update Account Password',
    currentPassword: 'Current Password *',
    newPassword: 'New Password *',
    confirmPassword: 'Confirm New Password *',
    changePasswordBtn: 'Update Password',

    // Admin
    adminHeading: '⚙️ Admin Management Dashboard',
    adminSub: 'Manage articles, topic categories, comments, and system users',
    addNewPostBtn: '➕ Create New Article',
    tabPosts: '📝 Articles Management',
    tabCategories: '📁 Categories Management',
    tabUsers: '👥 Users & Admin Management',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'vi'; // Mặc định là Tiếng Việt
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  const setLang = (lang) => {
    if (lang === 'vi' || lang === 'en') {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
