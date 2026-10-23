import { ProjectItem } from '../models/project.model';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'petites',
    title: 'Petites',
    subtitle: 'Full-Stack E-Commerce Platform & Grounded AI Shopping Concierge',
    category: 'Full-Stack E-Commerce Platform',
    badge: 'Flagship Project',
    period: '2026',
    summary:
      'Built a full-stack e-commerce platform with separate customer storefront and admin dashboard, backed by a Spring Boot REST API spanning 19+ domain modules. Implemented guest and authenticated checkout, mixed instant and scheduled orders, capacity management, coupons, loyalty rewards, and order tracking, with transactional processing and database locking to protect order capacity. Implemented JWT access/refresh token rotation, Spring Security role-based authorization, WebSocket notifications, and integrations with OpenAI, Gemini, Cloudinary, and Spring Mail. Deployed on a Linux VPS using multi-stage Docker builds, Docker Compose, isolated networks, health checks, and Nginx reverse proxy routing; automated build, test, and deployment workflows with Jenkins and GitHub Actions.',
    problemStatement:
      'Artisanal bakeries face conflicting operational realities: perishable shelf display items that must dispatch today vs. limited-quota custom desserts requiring future kitchen batching slots. Traditional single-cart systems collapse these paradigms, triggering kitchen overbooking, stockouts, and disjointed delivery dates, while lacking intelligent real-time conversational assistance for bilingual customers.',
    engineeringSolutions: [
      'Architected an atomic @Transactional mixed-fulfillment pipeline in CartService.checkout grouping items by DeliveryMode into isolated Order records with shared checkout responses and zero duplicate payments.',
      'Constructed a database-grounded AI Shopping Concierge in ChatbotService with dynamic inventory context injection, resilient LLM fallback (Gemini 3.5 Flash Lite → Gemini 3.6 Flash → OpenAI GPT-4o-mini → Arabic NLP), and machine action tags ([ACTION:ADD_TO_CART], [ACTION:CHECKOUT]) driving frontend cart state.',
      'Developed a standalone role-guarded operations dashboard (admin.petites.com) on a dedicated subdomain managing an 8-stage order lifecycle state machine (PENDING through COMPLETED / CANCELLED) with customer and guest checkout reconciliation.',
      'Engineered a dynamic kitchen control plane with ProductDailyCapacityUsage quotas, instant inventory time-cutoff rules (Cairo time), delivery fees, and weekly baking blackout dates.',
      'Built a customer loyalty milestone engine (awarding dynamic reward products upon completing configurable order thresholds) paired with a multi-constraint coupon subsystem (usage caps, min spend, fixed/percentage discounts).',
      'Containerized the entire platform via Docker Compose with 100% private backend/database network isolation, Spring Actuator health monitoring, Cloudinary media CDN, and automated Jenkins & GitHub Actions CI/CD pipelines.'
    ],
    keyFeatures: [
      'Spring Boot REST API spanning 19+ domain modules (orders, carts, products, categories, coupons, loyalty, chatbot, etc.)',
      'Dual-mode mixed fulfillment checkout: Instant same-day dispatch vs. scheduled artisanal batch pre-order',
      'Grounded Conversational AI Concierge: Multi-model Gemini fallback with machine action protocol for direct UI cart mutations',
      '8-stage kitchen order management pipeline with delivery vs. store pickup tracking and guest checkout sessions',
      'Operational kitchen control plane: Cairo-time daily cutoffs, delivery fees, and weekly baking blackout dates',
      'Customer loyalty stamp tracker & milestone reward redemption against designated products',
      'Multi-rule promotion engine: fixed/percent discounts, per-customer usage tracking, and minimum cart thresholds',
      'Egyptian InstaPay payment flow with QR transfer onboarding and admin-verified order reconciliation',
      'Automated Jenkins CI/CD pipeline with multi-stage Docker builds and zero-exposure private network topology'
    ],
    techStack: [
      { name: 'Angular 19', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Spring Boot 3.5', category: 'backend' },
      { name: 'Java 21', category: 'backend' },
      { name: 'PostgreSQL 16', category: 'database' },
      { name: 'Google Gemini AI', category: 'ai' },
      { name: 'OpenAI API', category: 'ai' },
      { name: 'JWT Auth', category: 'backend' },
      { name: 'WebSockets', category: 'backend' },
      { name: 'Jenkins CI/CD', category: 'devops' },
      { name: 'Docker Compose', category: 'devops' },
      { name: 'Nginx Proxy', category: 'devops' },
      { name: 'Cloudinary CDN', category: 'backend' },
      { name: 'Spring Mail', category: 'backend' }
    ],
    metrics: [
      { label: 'Domain Modules', value: '19+ Modules', subtext: 'Comprehensive DDD backend architecture' },
      { label: 'AI Concierge', value: 'Gemini Fallback', subtext: 'Gemini 3.5/3.6 + OpenAI + Arabic NLP' },
      { label: 'Fulfillment', value: 'Mixed-Mode', subtext: 'Atomic multi-order checkout by DeliveryMode' },
      { label: 'Architecture', value: 'Dual Angular Apps', subtext: 'Storefront (:80) + Admin Subdomain (:8081)' }
    ],
    views: [
      {
        id: 'home',
        label: 'Storefront Home',
        imagePath: '/images/projects/petites/Home.webp',
        altText: 'Petites customer storefront home page with featured products and category navigation',
        caption: 'Customer storefront home built with Angular 19 — featuring product highlights, category filters, and instant inventory badges.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Storefront',
        browserUrl: 'petites.com'
      },
      {
        id: 'products',
        label: 'Products Catalog',
        imagePath: '/images/projects/petites/Products.webp',
        altText: 'Petites product catalog with instant vs scheduled delivery item tags',
        caption: 'Full product grid with dual delivery-mode tags distinguishing same-day dispatch from artisanal batch pre-orders.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Catalog',
        browserUrl: 'petites.com/products'
      },
      {
        id: 'cart',
        label: 'Cart & Mixed Fulfillment',
        imagePath: '/images/projects/petites/Cart.webp',
        altText: 'Petites cart drawer showing mixed instant and scheduled items before checkout',
        caption: 'Cart view grouping items by DeliveryMode — the foundation of the atomic mixed-fulfillment checkout engine.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Domain Core',
        browserUrl: 'petites.com/cart'
      },
      {
        id: 'pre-checkout',
        label: 'Pre-Checkout Flow',
        imagePath: '/images/projects/petites/PreCheckout.webp',
        altText: 'Petites pre-checkout screen with order summary and InstaPay QR payment step',
        caption: 'Pre-checkout step confirming fulfillment split, delivery address, and InstaPay QR onboarding.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Checkout',
        browserUrl: 'petites.com/checkout'
      },
      {
        id: 'post-checkout',
        label: 'Order Placement Confirmation',
        imagePath: '/images/projects/petites/PostCheckout.webp',
        altText: 'Petites order confirmation receipt showing multiple order IDs for partitioned items',
        caption: 'Order confirmation screen confirming partitioned orders generated from a single checkout session.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Confirmation',
        browserUrl: 'petites.com/order-success'
      },
      {
        id: 'tracking',
        label: 'Live Order Tracking',
        imagePath: '/images/projects/petites/Orders.webp',
        fallbackImagePath: '/images/projects/petites/Tracking.webp',
        altText: 'Petites live order tracking interface displaying active 8-stage progress state',
        caption: 'Customer tracking screen reflecting live order state transitions from PENDING through to COMPLETED via WebSockets.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Tracking',
        browserUrl: 'petites.com/track'
      },
      {
        id: 'loyalty',
        label: 'Loyalty & Reward Stamps',
        imagePath: '/images/projects/petites/Loyalty.webp',
        fallbackImagePath: '/images/projects/petites/Loyalyty.webp',
        altText: 'Petites loyalty stamp tracker screen rewarding milestones after every 5 completed orders',
        caption: 'Customer loyalty program awarding dynamic reward treats upon crossing order threshold milestones.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Loyalty',
        browserUrl: 'petites.com/loyalty'
      },
      {
        id: 'about',
        label: 'Artisanal Bakery Story',
        imagePath: '/images/projects/petites/About.webp',
        fallbackImagePath: '/images/projects/petites/Admin.webp',
        altText: 'Petites kitchen heritage and artisanal craft story',
        caption: 'Artisanal bakery story, culinary heritage, and production background.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Bakery Story',
        browserUrl: 'petites.com/about'
      }
    ],
    githubUrl: 'https://github.com/IbrahimM0stafa',
    accentColor: '#d97706'
  },
  {
    id: 'smart-city',
    title: 'Smart City Platform',
    subtitle: 'Municipal Monitoring Platform & Telemetry Dashboard &bull; DXC Technology',
    category: 'Enterprise IoT & Telemetry Platform',
    badge: 'DXC Internship Project',
    period: '2025',
    summary:
      'Built a Smart City monitoring platform using Angular, TypeScript, Spring Boot, Java 21, and MySQL during an enterprise software engineering internship at DXC Technology. Developed REST APIs with JWT authentication, conducted API testing, and integrated monitoring dashboards. Optimized database queries and indexing to improve API response times and application performance. Deployed containerized applications using Docker and Docker Compose in an Agile environment.',
    problemStatement:
      'Municipal infrastructure management requires synthesizing massive streams of environmental, traffic, and energy sensor data into actionable alerts without introducing latency bottlenecks or security vulnerabilities.',
    engineeringSolutions: [
      'Developed high-throughput Spring Boot REST APIs with JWT authentication for secure telemetry ingestion.',
      'Optimized database queries and indexing in MySQL, achieving a verified 30% reduction in API response times.',
      'Audited clean code compliance and architectural integrity via DXC SonarQube quality gates, achieving an "A" rating.',
      'Containerized applications using Docker and Docker Compose to ensure consistent staging environments across the Agile team.'
    ],
    keyFeatures: [
      'Real-time municipal sensor telemetry ingestion and adaptive metric visualization',
      'Optimized SQL query performance reducing response latency by 30%',
      'Stateless JWT authentication filter protecting administrative monitoring routes',
      'Docker Compose deployment pipeline for staging and local microservice integration',
      'Verified clean code compliance audited via DXC SonarQube quality gates'
    ],
    techStack: [
      { name: 'Angular', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'Java 21', category: 'backend' },
      { name: 'MySQL', category: 'database' },
      { name: 'Docker', category: 'devops' },
      { name: 'Docker Compose', category: 'devops' },
      { name: 'SonarQube', category: 'devops' },
      { name: 'JWT Auth', category: 'backend' }
    ],
    metrics: [
      { label: 'Latency Reduction', value: '-30%', subtext: 'Query indexing & API response streamlining' },
      { label: 'Code Quality', value: 'SonarQube A', subtext: 'Zero critical vulnerabilities & bugs' },
      { label: 'Organization', value: 'DXC Technology', subtext: 'Software Engineering Internship' }
    ],
    views: [
      {
        id: 'overview',
        label: 'Telemetry Overview',
        imagePath: '/images/projects/smart-city/dashboard-overview.svg',
        altText: 'Smart City monitoring dashboard with sensor metrics and active municipality incident alerts',
        caption: 'Executive telemetry console showing urban air quality, energy efficiency, and system alerts.',
        deviceType: 'desktop',
        badge: 'Main Console'
      },
      {
        id: 'traffic',
        label: 'Traffic Flow & Signals',
        imagePath: '/images/projects/smart-city/traffic-sensor.svg',
        altText: 'Traffic flow corridor dashboard with junction latency and vehicle throughput analytics',
        caption: 'Corridor telemetry dashboard showing junction throughput and adaptive signal algorithms.',
        deviceType: 'desktop',
        badge: 'Traffic'
      },
      {
        id: 'pollution',
        label: 'Air Quality & Dispersion',
        imagePath: '/images/projects/smart-city/pollution-map.svg',
        altText: 'Air pollution dashboard displaying PM2.5, NO2, and gas sensor distribution',
        caption: 'Environmental monitoring subsystem mapping pollutant dispersion across municipal zones.',
        deviceType: 'desktop',
        badge: 'Environment'
      },
      {
        id: 'sonarqube-audit',
        label: 'Verified SonarQube Gate',
        imagePath: '/images/projects/smart-city/sonarqube-frontend-quality.jpg',
        fallbackImagePath: '/images/projects/smart-city/sonarqube-backend-quality.jpg',
        altText: 'Verified SonarQube Quality Gate report showing passed analysis during DXC internship',
        caption: 'Authentic DXC SonarQube audit verifying zero bugs, zero security vulnerabilities, and code health.',
        deviceType: 'desktop',
        isVerifiedAsset: true,
        badge: 'Verified Audit'
      }
    ],
    githubUrl: 'https://github.com/IbrahimM0stafa',
    accentColor: '#4f46e5'
  },
  {
    id: 'human-aid',
    title: 'Human Aid',
    subtitle: 'Dyslexia Support System & Interactive Assistive Learning Application',
    category: 'Mobile & Assistive AI System',
    badge: 'Assistive Tech Project',
    period: '2025',
    summary:
      'Developed a full-stack mobile application supporting dyslexia learning using Flutter, Node.js, and AI integration. Built backend services using Node.js and integrated AI features such as speech-to-text and content generation. Designed accessible user interfaces to support the learning experience.',
    problemStatement:
      'Standard digital learning tools rely on dense text layouts and unadapted phonetics, which cause intense visual stress, letter confusion, and disorientation for learners diagnosed with dyslexia.',
    engineeringSolutions: [
      'Developed accessible mobile user interfaces with dyslexia-friendly color contrast, high-legibility typography, and clear visual chunking.',
      'Implemented Node.js microservices handling learning activities, learner progress records, and speech-to-text integration.',
      'Designed interactive phonetic exercises with multi-sensory feedback (audio pronunciation, illustrated flashcards, and step-by-step progress).',
      'Engineered structured learner progress tracking allowing parents and instructors to review milestones without overwhelming the child.'
    ],
    keyFeatures: [
      'Phonetic learning activities with Arabic visual cues and crystal-clear audio pronunciation',
      'Customized learner dashboard with activity discovery and simplified navigation hierarchy',
      'Word-building vocabulary modules and multi-step learning tracks',
      'Speech-to-text assistance and assistive content generation endpoints',
      'Comprehensive learner progress analytics and activity logs'
    ],
    techStack: [
      { name: 'Flutter', category: 'frontend' },
      { name: 'Dart', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'AI / Speech-to-Text', category: 'ai' },
      { name: 'REST APIs', category: 'backend' },
      { name: 'Accessible UI/UX', category: 'frontend' }
    ],
    metrics: [
      { label: 'Accessibility', value: 'High Legibility', subtext: 'High contrast & specialized phonetic spacing' },
      { label: 'Platform', value: 'Mobile App', subtext: 'Flutter cross-platform client with Node.js API' },
      { label: 'Modality', value: 'Multi-Sensory', subtext: 'Audio, tactile & visual associative cues' }
    ],
    views: [
      {
        id: 'learner-dash',
        label: 'Learner Home Console',
        imagePath: '/images/projects/human-aid/learner-dashboard.png',
        altText: 'Human Aid learner dashboard showing categories, tips, and vocabulary learning activities',
        caption: 'Authentic mobile screenshot of the learner dashboard with friendly category navigation.',
        deviceType: 'mobile',
        isVerifiedAsset: true,
        badge: 'Mobile App'
      },
      {
        id: 'phonetics-lesson',
        label: 'Phonetic Flashcard Lesson',
        imagePath: '/images/projects/human-aid/phonetics-lesson.png',
        altText: 'Human Aid interactive Arabic letter and phonetic pronunciation activity',
        caption: 'Interactive phonetic lesson associating letterforms with visual cues and audio pronunciation.',
        deviceType: 'mobile',
        isVerifiedAsset: true,
        badge: 'Phonetics'
      },
      {
        id: 'word-activities',
        label: 'Interactive Vocabulary',
        imagePath: '/images/projects/human-aid/word-activities.png',
        altText: 'Human Aid vocabulary exercise and pronunciation verification screen',
        caption: 'Interactive word challenge screen reinforcing phonetic recognition.',
        deviceType: 'mobile',
        isVerifiedAsset: true,
        badge: 'Activity'
      },
      {
        id: 'progress-tracking',
        label: 'Progress Analytics',
        imagePath: '/images/projects/human-aid/progress-tracking.png',
        altText: 'Human Aid learner progress metrics and completed milestone history',
        caption: 'Learner milestone tracking enabling continuous feedback without test anxiety.',
        deviceType: 'mobile',
        isVerifiedAsset: true,
        badge: 'Progress'
      },
      {
        id: 'video-walkthrough',
        label: 'Live Screen Recording',
        imagePath: '/images/projects/human-aid/learner-dashboard.png',
        videoPath: '/images/projects/human-aid/app-walkthrough.mp4',
        altText: 'Genuine screen recording of the Human Aid mobile application in action',
        caption: 'Verified screen recording captured from an active device session demonstrating app flow.',
        deviceType: 'mobile',
        isVerifiedAsset: true,
        badge: 'Video Walkthrough'
      }
    ],
    githubUrl: 'https://github.com/IbrahimM0stafa',
    accentColor: '#2563eb'
  },
  {
    id: 'fake-news-detector',
    title: 'Fake News Detector',
    subtitle: 'NLP & Machine Learning Text Classification Platform',
    category: 'AI & Machine Learning System',
    badge: 'NLP & ML Project',
    period: '2025',
    summary:
      'Developed a fake news detection system using Natural Language Processing and machine learning techniques. Implemented text preprocessing and TF-IDF feature extraction to support text classification. Built an interactive Streamlit interface for analyzing news credibility and evaluating model performance.',
    problemStatement:
      'Online misinformation propagates rapidly through digital media. Manual verification is incapable of keeping pace with high-velocity articles, requiring automated linguistic and statistical credibility analysis.',
    engineeringSolutions: [
      'Engineered text preprocessing pipelines (tokenization, stop-word removal, lemmatization, and n-gram analysis).',
      'Implemented TF-IDF (Term Frequency-Inverse Document Frequency) vectorization for robust textual feature extraction.',
      'Trained and evaluated supervised machine learning classifiers to determine article authenticity probabilities.',
      'Constructed an interactive Streamlit dashboard allowing users to input live articles, inspect confidence scores, and review linguistic feature weights.'
    ],
    keyFeatures: [
      'Natural Language Processing pipeline with automated text cleaning and normalization',
      'TF-IDF feature extraction extracting statistical document weights',
      'Supervised classification model predicting news veracity',
      'Interactive Streamlit UI for immediate text submission and credibility scoring',
      'Model performance evaluation and confusion matrix diagnostics'
    ],
    techStack: [
      { name: 'Python', category: 'ai' },
      { name: 'NLP', category: 'ai' },
      { name: 'Scikit-Learn', category: 'ai' },
      { name: 'TF-IDF', category: 'ai' },
      { name: 'Streamlit', category: 'frontend' }
    ],
    metrics: [
      { label: 'Domain', value: 'NLP & ML', subtext: 'Text preprocessing & feature extraction' },
      { label: 'Interface', value: 'Streamlit', subtext: 'Interactive real-time credibility scoring' },
      { label: 'Technology', value: 'Python 3', subtext: 'TF-IDF Vectorization & Classification' }
    ],
    views: [
      {
        id: 'streamlit-console',
        label: 'Analysis Console',
        imagePath: '/images/projects/fake-news-detector/nlp-dashboard.svg',
        altText: 'Fake News Detection interactive Streamlit analysis interface',
        caption: 'Interactive Streamlit console providing real-time credibility analysis and feature evaluation.',
        deviceType: 'desktop',
        badge: 'ML Interface'
      }
    ],
    githubUrl: 'https://github.com/IbrahimM0stafa',
    accentColor: '#8b5cf6'
  }
];
