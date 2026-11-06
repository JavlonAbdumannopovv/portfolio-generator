import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  adminPassword: 'admin',
  themeConfig: {
    primaryColor: '#00f0ff',
    secondaryColor: '#4edea3',
    darkBgColor: '#10131a',
  },
  hero: {
    badge: {
      uz: 'Yangi loyihalar va hamkorlik uchun ochiq',
      ru: 'Открыт для новых проектов и сотрудничества',
      en: 'Open for new projects & collaboration',
    },
    title: {
      uz: 'Frontend React Dasturchi & IT Mentor',
      ru: 'Frontend React Разработчик & IT Ментор',
      en: 'Frontend React Developer & IT Mentor',
    },
    subtitle: {
      uz: 'Javlon Abdumannopov',
      ru: 'Джавлон Абдуманнопов',
      en: 'Javlon Abdumannopov',
    },
    bio: {
      uz: "React, TypeScript va Tailwind CSS bo'yicha amaliy tajribaga ega dasturchi hamda Geeks Andijan IT akademiyasi mentori. 100 dan ortiq o'quvchilarga ta'lim bergan va amaliy veb-loyihalarni amalga oshirgan.",
      ru: "Разработчик с практическим опытом в React, TypeScript и Tailwind CSS, а также IT-ментор в академии Geeks Andijan. Обучил более 100 студентов и реализовал практические веб-проекты.",
      en: "Developer with solid practical expertise in React, TypeScript, and Tailwind CSS, as well as an IT mentor at Geeks Andijan. Trained over 100 students and built production web applications.",
    },
    ctaConsult: {
      uz: "Bog'lanish",
      ru: 'Связаться',
      en: 'Get in Touch',
    },
    ctaProjects: {
      uz: "Loyihalarni ko'rish",
      ru: 'Посмотреть проекты',
      en: 'View Projects',
    },
    resumeUrl: '#',
    avatarUrl: '/javlon.png',
    statusRole: '// Frontend • React Dasturchi',
    locationBadge: 'Andijon | Geeks IT Mentor',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Computer Science', 'Tilda', 'Git'],
    developerSnippet: {
      fileName: 'developer.tsx',
      studentBadge: '100+ o\'quvchilar',
      codeLine: "const developer = { name: 'Javlon', role: 'React & Mentor' };",
    },
  },
  stats: {
    studentsCount: '100+',
    studentsLabel: {
      uz: 'O\'quvchilar & Shogirdlar',
      ru: 'Студенты & Выпускники',
      en: 'Students Trained',
    },
    experienceYears: '3+ yil',
    experienceLabel: {
      uz: 'Amaliy tajriba',
      ru: 'Практический опыт',
      en: 'Years Experience',
    },
    projectsCount: '15+',
    projectsLabel: {
      uz: 'Muvaffaqiyatli loyihalar',
      ru: 'Успешных проектов',
      en: 'Completed Projects',
    },
    satisfactionRate: '100%',
    satisfactionLabel: {
      uz: 'Sifatli natija',
      ru: 'Качественный результат',
      en: 'Quality Delivery',
    },
  },
  about: {
    heading: {
      uz: 'Amaliy bilim va tushunarli ta\'lim yondashuvi',
      ru: 'Практические знания и доступная методика обучения',
      en: 'Practical engineering and approachable mentorship',
    },
    subheading: {
      uz: "Javlon Abdumannopov haqida",
      ru: 'О Джавлоне Абдуманнопове',
      en: 'About Javlon Abdumannopov',
    },
    fullBio: {
      uz: "Assalomu alaykum! Men Javlon Abdumannopov — Frontend React dasturchi va Geeks Andijan o'quv markazida Computer Science hamda Frontend yo'nalishlari bo'yicha mentorman. 100 dan ortiq o'quvchilarga dasturlash asoslari va veb-texnologiyalarni o'rgatganman. 21-asrda ko'rib turgan barcha qulayliklaringiz uchun dasturchilardan qarzdorsiz — agar ular bo'lmaganda, bugungi hayotingizdagi 90% raqamli qulayliklar bo'lmasdi. Dasturlash bu shunchaki kod yozish emas, balki odamlar hayotini osonlashtiradigan haqiqiy yechimlar yaratishdir.",
      ru: "Ассалому алейкум! Я Джавлон Абдуманнопов — Frontend React разработчик и ментор по Computer Science и Frontend в Geeks Andijan. Обучил более 100 студентов. В XXI веке за большинство окружающих нас удобств мы обязаны разработчикам — без них не существовало бы 90% привычных цифровых благ. Программирование — это искусство создавать реальные решения, упрощающие жизнь людей.",
      en: "Assalomu alaykum! I am Javlon Abdumannopov — Frontend React Developer and Computer Science & Frontend mentor at Geeks Andijan. I have taught web engineering to over 100 students. In the 21st century, most modern conveniences are owed to software developers — without them, 90% of everyday digital comfort would not exist. Programming is about crafting real-world solutions that make life better.",
    },
    highlightStory: {
      uz: "Eng murakkab texnologiyani ham to'g'ri metodika bilan har kim o'rgana oladi.",
      ru: 'Любую сложную технологию можно освоить при правильной и понятной методике.',
      en: 'Even the most intricate concepts become straightforward with clear, supportive pedagogy.',
    },
    checklist: [
      {
        uz: "Computer Science va dasturlash mantig'i",
        ru: "Computer Science и логика кода",
        en: "Computer Science and programming logic",
      },
      {
        uz: "Sodda va tushunarli tushuntirish",
        ru: "Понятное и доступное объяснение",
        en: "Clear and straightforward explanations",
      },
      {
        uz: "Tildadan Reactga o'tkazish tajribasi",
        ru: "Опыт миграции с Tilda на React",
        en: "Tilda to React migration skills",
      },
      {
        uz: "Amaliy loyihalar ustida ishlash",
        ru: "Работа над практическими проектами",
        en: "Hands-on project work",
      },
    ],
    pillars: [
      {
        title: {
          uz: 'Frontend React Dasturlash',
          ru: 'Frontend React Разработка',
          en: 'Frontend React Engineering',
        },
        desc: {
          uz: "React, TypeScript va Tailwind CSS asosida toza, modulli va qulay veb-ilovalar ishlab chiqish.",
          ru: 'Создание чистых, модульных и удобных веб-приложений на React, TypeScript и Tailwind CSS.',
          en: 'Building clean, maintainable, and user-friendly web applications with React, TypeScript, and Tailwind CSS.',
        },
      },
      {
        title: {
          uz: 'Geeks Andijan & 100+ O\'quvchilar',
          ru: 'Geeks Andijan & 100+ Студентов',
          en: 'Geeks Andijan & 100+ Students',
        },
        desc: {
          uz: "100 dan ortiq o'quvchilarga Computer Science va Frontend asoslarini o'rgatish, doimiy amaliy yordam va do'stona muhit.",
          ru: 'Обучение более 100 студентов основам Computer Science и Frontend, дружелюбная атмосфера и поддержка.',
          en: 'Mentored over 100 students in Computer Science and Frontend fundamentals with supportive guidance.',
        },
      },
      {
        title: {
          uz: 'Tushuntira Olish Qobiliyati & Metodika',
          ru: 'Умение Просто Объяснять & Методика',
          en: 'Clear Communication & Teaching Methodology',
        },
        desc: {
          uz: "Murakkab dasturlash mavzularini sodda va tushunarli qilib yetkazish, har bir o'quvchiga individual yondashuv.",
          ru: 'Умение доносить сложные темы программирования простым и понятным языком, индивидуальный подход к каждому.',
          en: 'Breaking down complex programming topics into simple, intuitive concepts with a personalized approach for every learner.',
        },
      },
    ],
  },
  skills: [
    { id: 'sk-1', name: 'React (v18 / v19)', category: 'core', level: 95, highlight: true },
    { id: 'sk-2', name: 'TypeScript', category: 'core', level: 90, highlight: true },
    { id: 'sk-3', name: 'Tailwind CSS', category: 'core', level: 95, highlight: true },
    { id: 'sk-4', name: 'JavaScript (ES6+)', category: 'core', level: 92, highlight: true },
    { id: 'sk-5', name: 'HTML5 & Semantic Web', category: 'core', level: 95, highlight: true },
    { id: 'sk-6', name: 'CSS3 & Modern Layouts', category: 'core', level: 92, highlight: true },
    { id: 'sk-7', name: 'Computer Science Asoslari', category: 'core', level: 90, highlight: true },
    { id: 'sk-8', name: 'Git & GitHub Workflows', category: 'tools', level: 90, highlight: true },
    { id: 'sk-9', name: 'Vite & Tooling', category: 'tools', level: 90, highlight: false },
    { id: 'sk-10', name: 'REST API', category: 'additional', level: 88, highlight: false },
    { id: 'sk-11', name: 'NestJS', category: 'additional', level: 75, highlight: false },
    { id: 'sk-12', name: 'Linux & Bash', category: 'additional', level: 80, highlight: false },
    { id: 'sk-13', name: 'Tilda Migratsiyasi', category: 'additional', level: 85, highlight: false },
    { id: 'sk-14', name: 'Redux Toolkit / Zustand', category: 'core', level: 85, highlight: false },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'LinkHub — Shaxsiy LinkTree Muqobili',
      description: {
        uz: "Foydalanuvchilar barcha ijtimoiy tarmoq va loyiha havolalarini bitta qulay sahifada jamlash imkonini beruvchi bio-link platformasi. Dinamik mavzular va tezkor yuklanish.",
        ru: 'Платформа био-ссылок — стильная альтернатива Linktree. Позволяет собрать все ссылки на одной странице с кастомными темами.',
        en: 'A modern bio-link web platform alternative to Linktree. Consolidates social and project links into an elegant glassmorphic profile.',
      },
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      demoUrl: 'https://linkhub-demo.vercel.app',
      githubUrl: 'https://github.com/javlon-abdumannopov/linkhub',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'Business Audit — Tahlil & Raqamlashtirish',
      description: {
        uz: "Biznes jarayonlarini tahlil qilish, kamchiliklarni aniqlash va korxona faoliyatini raqamlashtirish bo'yicha tavsiyalar beruvchi analitik veb-ilova.",
        ru: 'Веб-приложение для аудита бизнеса. Анализирует ключевые показатели и предлагает план цифровизации процессов.',
        en: 'Business analytics and digitization web application evaluating SME processes and delivering actionable transformation insights.',
      },
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      tags: ['React', 'Tailwind CSS', 'Vite', 'REST API'],
      demoUrl: 'https://business-audit.vercel.app',
      githubUrl: 'https://github.com/javlon-abdumannopov/business-audit',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'Tilda to Custom React Migration',
      description: {
        uz: "Tildada yaratilgan sekin va cheklangan veb-saytlarni toza kodli, tezkor va erkin moslashuvchan React ilovalariga o'girish.",
        ru: 'Проект миграции сайтов с платформы Tilda на чистый React-код с максимальной гибкостью и скоростью.',
        en: 'Migrating legacy Tilda landing pages into modular, maintainable, and high-performance custom React web applications.',
      },
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
      tags: ['React', 'Tailwind CSS', 'Vite', 'Tilda'],
      demoUrl: 'https://migration-speed.vercel.app',
      githubUrl: 'https://github.com/javlon-abdumannopov/tilda-react-migration',
      featured: true,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: {
        uz: 'Computer Science va Frontend Dasturlashdan Mentor',
        ru: 'Ментор по Computer Science и Frontend Разработке',
        en: 'Computer Science & Frontend Mentor',
      },
      company: "Geeks Andijan o'quv markazi",
      period: {
        uz: '2025 noyabr — Hozirgacha',
        ru: 'Ноябрь 2025 — Настоящее время',
        en: 'Nov 2025 — Present',
      },
      location: 'Andijon, O\'zbekiston',
      description: {
        uz: "O'quvchilarga Computer Science asoslari, algoritmik mantiq, HTML, CSS, JavaScript, React va TypeScript texnologiyalari bo'yicha amaliy darslar berish. Mavzularni sodda va tushunarli tilda yetkazish hamda loyihalar qilishga tayyorlash.",
        ru: 'Обучение основам Computer Science, алгоритмическому мышлению, HTML/CSS, JavaScript, React и TypeScript. Простое и понятное объяснение тем и поддержка студентов на практике.',
        en: 'Instructing Computer Science fundamentals, logic, and web development with React and TypeScript. Guiding students with clear, accessible teaching methods.',
      },
      points: {
        uz: [
          "100 dan ortiq o'quvchilarga IT va dasturlash asoslarini o'rgatish",
          "Mavzularni sodda va tushunarli hayotiy misollar bilan tushuntirish metodikasi",
          "O'quvchilar bilan do'stona muloqot va muntazam kod tahlillari",
        ],
        ru: [
          'Успешное обучение более 100 студентов основам IT и программирования',
          'Методика объяснения сложных тем на простых жизненных примерах',
          'Дружелюбная поддержка и регулярные разборы кода студентов',
        ],
        en: [
          'Taught IT and programming fundamentals to over 100 students',
          'Pedagogy based on clear analogies and real-world coding examples',
          'Supportive student mentorship and regular hands-on code reviews',
        ],
      },
      badge: 'Asosiy faoliyat',
    },
    {
      id: 'exp-2',
      role: {
        uz: 'Erkin Amaliyot (Freelance & Loyihalar)',
        ru: 'Практическая деятельность (Фриланс)',
        en: 'Freelance & Independent Practice',
      },
      company: 'Erkin amaliyot',
      period: {
        uz: '2023 — 2025',
        ru: '2023 — 2025',
        en: '2023 — 2025',
      },
      location: 'Remote / Masofaviy',
      description: {
        uz: "Mijozlar uchun zamonaviy SPA veb-ilovalar ishlab chiqish, Tilda saytlarini toza React kodiga o'tkazish, biznes uchun qulay interfeyslar yaratish.",
        ru: 'Разработка современных SPA веб-приложений, перенос проектов с Tilda на чистый код React, создание удобных интерфейсов.',
        en: 'Building modern SPA web apps, migrating Tilda projects to clean React codebases, and crafting developer-grade user interfaces.',
      },
      points: {
        uz: [
          "Digital Uzbekistan ta'lim platformasi",
          "15+ dan ziyod amaliy veb-loyihalarni muvaffaqiyatli topshirish",
          "Tildadan Reactga o'tkazish orqali veb-ilovalarni erkin moslashuvchan qilish",
        ],
        ru: [
          'Образовательная платформа Digital Uzbekistan',
          'Успешная сдача 15+ практических веб-проектов',
          'Расширение возможностей сайтов за счет миграции с Tilda на React',
        ],
        en: [
          'Digital Uzbekistan educational platform project',
          'Completed 15+ practical web application projects',
          'Extended platform capabilities via Tilda-to-React migration',
        ],
      },
      badge: 'Erkin amaliyot',
    },
  ],
  mentorship: {
    title: {
      uz: "Ta'lim Faoliyati",
      ru: 'Преподавательская деятельность',
      en: 'Teaching & Mentorship',
    },
    description: {
      uz: "Geeks Andijan IT akademiyasidagi faoliyat va o'quvchilarga ta'lim berish metodikasi.",
      ru: 'Деятельность в IT-академии Geeks Andijan и методика обучения студентов.',
      en: 'Mentorship activities and student coaching at Geeks Andijan.',
    },
    modules: [],
    results: [],
  },
  contact: {
    telegram: 'https://t.me/javlon_dev',
    telegramUsername: '@javlon_dev',
    github: 'https://github.com/javlon-abdumannopov',
    linkedin: 'https://linkedin.com/in/javlon-abdumannopov',
    email: 'javlon.developer@gmail.com',
    phone: '+998 (90) 123-45-67',
    location: 'Andijon shahar / Remote Ready',
    statusBadge: {
      uz: '🟢 Loyihalar va hamkorlik uchun ochiqman',
      ru: '🟢 Открыт для предложений и новых проектов',
      en: '🟢 Open for projects and collaboration',
    },
  },
};
