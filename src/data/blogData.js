// Dữ liệu mô phỏng bài viết Blog chuẩn kết hợp giao diện Tạp chí Công nghệ Đương đại
export const blogCategories = [
  { id: 'all', name: 'ALL STORIES', icon: '✦' },
  { id: 'frontend', name: 'FRONTEND & REACT', icon: '⚛️' },
  { id: 'backend', name: 'BACKEND & NODEJS', icon: '🟢' },
  { id: 'ai-data', name: 'AI & MACHINE LEARNING', icon: '🤖' },
  { id: 'devops', name: 'DEVOPS & DOCKER', icon: '🐳' },
  { id: 'career', name: 'CAREER & MINDSET', icon: '🚀' },
];

export const initialPosts = [
  {
    id: 1,
    title: 'FRONTEND ROADMAP 2026 - Master Modern React, Vite & Architecture',
    slug: 'frontend-roadmap-2026-react-vite',
    excerpt: 'A comprehensive engineering guide from semantic HTML5, CSS Grid, React 18 hooks to client-side routing and Web Vitals optimization.',
    content: `The frontend development ecosystem in 2026 demands both deep fundamentals and rapid architectural adaptability.

1. The Modern Core: Semantic HTML5, modern CSS variables, CSS Grid, and asynchronous ES6+ JavaScript.
2. Component-Based Architecture: Single Page Applications with React 18, React Router DOM, and modular state management.
3. Build Tooling & Bundling: Why Vite replaces legacy bundlers with near-instant hot module replacement and native ES modules.
4. Testing & Code Quality: Strict linting, component isolation, and accessibility (a11y) standards.

Continuous practice on real-world projects is the most effective path toward engineering excellence.`,
    category: 'frontend',
    categoryName: 'FRONTEND & REACT',
    author: {
      name: 'Nguyen Van Hoang',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Frontend Lead'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-11-08',
    readTime: '6 min read',
    views: 4210,
    likes: 312,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 101,
        author: 'Tran Van Nam',
        date: '2026-11-09 10:15',
        content: 'The breakdown of Vite vs CRA is so clear and spot on for our web programming assignment!'
      },
      {
        id: 102,
        author: 'Le Phuong Thao',
        date: '2026-11-09 14:30',
        content: 'Loved the UI layout of this blog. It looks just like an international design magazine!'
      }
    ]
  },
  {
    id: 2,
    title: 'GENERATIVE AI REVOLUTION - Integrating LLMs into Modern Web Apps',
    slug: 'generative-ai-revolution-integrating-llms',
    excerpt: 'Hands-on strategies to leverage AI APIs, vector embeddings, and streaming responses directly inside React interfaces.',
    content: `Artificial intelligence is fundamentally reshaping how developers build web software.

- Automated code scaffolding, test case generation, and schema migrations.
- Streaming UI responses using React Suspense and Server-Sent Events (SSE).
- Guardrails, prompt engineering, and context window management for high-throughput applications.`,
    category: 'ai-data',
    categoryName: 'AI & MACHINE LEARNING',
    author: {
      name: 'Dang Tuan Kiet',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'AI Researcher'
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-11-05',
    readTime: '8 min read',
    views: 5890,
    likes: 480,
    status: 'published',
    featured: true,
    comments: [
      {
        id: 103,
        author: 'Do Huu Thang',
        date: '2026-11-06 09:20',
        content: 'Fantastic article. Streaming responses really improved our user perceived latency.'
      }
    ]
  },
  {
    id: 3,
    title: 'CONTAINER & DOCKER FLOW - Zero to Production Deployment',
    slug: 'container-docker-flow-production',
    excerpt: 'Demystifying multi-stage Dockerfiles, Docker Compose orchestration, and environment parity for full-stack developers.',
    content: `Eliminating the classic "it works on my machine" dilemma through standardized containerization.

1. Multi-stage build for React applications with lightweight Nginx servers.
2. Containerizing NodeJS/Express RESTful APIs with optimized layer caching.
3. Orchestrating Frontend, Backend, and MongoDB/PostgreSQL databases using docker-compose.yml.`,
    category: 'devops',
    categoryName: 'DEVOPS & DOCKER',
    author: {
      name: 'Vo Minh Tri',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'DevOps Specialist'
    },
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-11-02',
    readTime: '7 min read',
    views: 3950,
    likes: 290,
    status: 'published',
    featured: true,
    comments: []
  },
  {
    id: 4,
    title: 'BACKEND ARCHITECTURE - Designing Scalable RESTful APIs with Express',
    slug: 'backend-architecture-scalable-express-apis',
    excerpt: 'Best practices for controller-service-repository patterns, JWT authentication, and structured error handling.',
    content: `A resilient backend architecture is the foundation of any reliable web application.
    
- Clean folder structure separating route definitions, business logic, and database access.
- Securing endpoints with JSON Web Tokens (JWT) and role-based access control (RBAC).
- Centralized error-handling middlewares and input validation with Joi / Zod.`,
    category: 'backend',
    categoryName: 'BACKEND & NODEJS',
    author: {
      name: 'Vo Minh Tri',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'DevOps Specialist'
    },
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-10-28',
    readTime: '9 min read',
    views: 3420,
    likes: 215,
    status: 'published',
    featured: false,
    comments: []
  },
  {
    id: 5,
    title: 'THE ART OF UI/UX IN CODE - Micro-Interactions & Visual Hierarchy',
    slug: 'art-of-ui-ux-in-code-micro-interactions',
    excerpt: 'How frontend engineers can transform static mockups into living, breathing digital products with CSS transitions.',
    content: `Great interfaces are felt before they are analyzed.
    
- Implementing smooth layout transitions with hardware-accelerated CSS properties (transform & opacity).
- Using deliberate typography contrasts to guide the reader effortlessly through long-form technical blogs.
- Ensuring responsive accessibility across touchscreens, keyboards, and varying screen resolutions.`,
    category: 'frontend',
    categoryName: 'FRONTEND & REACT',
    author: {
      name: 'Pham Thu Trang',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'UI Designer'
    },
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-10-22',
    readTime: '5 min read',
    views: 2890,
    likes: 198,
    status: 'published',
    featured: false,
    comments: []
  },
  {
    id: 6,
    title: 'ENGINEERING MINDSET - How to Think in Systems and Solve Hard Problems',
    slug: 'engineering-mindset-think-in-systems',
    excerpt: 'Deconstructing complex software engineering challenges into clear, manageable and verifiable components.',
    content: `Senior engineers differentiate themselves not merely by syntax knowledge, but by problem formulation.
    
- Identifying boundary constraints and failure points before writing the first line of code.
- Prioritizing readability and maintainability over clever, unmaintainable abstractions.
- Continuous learning through writing, teaching, and sharing open knowledge with the developer community.`,
    category: 'career',
    categoryName: 'CAREER & MINDSET',
    author: {
      name: 'Nguyen Van Hoang',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Frontend Lead'
    },
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80',
    publishedDate: '2026-10-15',
    readTime: '6 min read',
    views: 4120,
    likes: 360,
    status: 'published',
    featured: true,
    comments: []
  }
];

export const initialUsers = [
  {
    id: 1,
    username: 'admin',
    name: 'Admin - DevBlog Lead',
    email: 'admin@devblog.com',
    role: 'admin',
    birthYear: '1995',
    phone: '+84 901 234 567',
    address: 'DevBlog Studio, 227 Nguyen Van Cu, District 5, HCMC',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    username: 'hoang_dev',
    name: 'Nguyen Van Hoang',
    email: 'hoang.dev@example.com',
    role: 'user',
    birthYear: '2004',
    phone: '0912 345 678',
    address: 'District 10, Ho Chi Minh City',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    username: 'thao_le',
    name: 'Le Phuong Thao',
    email: 'thao.le@example.com',
    role: 'user',
    birthYear: '2003',
    phone: '0987 654 321',
    address: 'Binh Thanh, Ho Chi Minh City',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  }
];
