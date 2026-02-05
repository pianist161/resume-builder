import type { ResumeData } from "@/lib/types";

export const mockResume: ResumeData = {
  basics: {
    name: "Александр Петров",
    title: "Senior Frontend Developer",
    email: "alex.petrov@email.com",
    phone: "+7 (999) 123-45-67",
    location: "Москва, Россия",
    website: "https://alexpetrov.dev",
  },
  summary:
    "Опытный Frontend-разработчик с 7+ годами коммерческого опыта. Специализируюсь на React, TypeScript и построении масштабируемых веб-приложений. Руководил командой из 5 разработчиков, внедрял best practices и CI/CD процессы.",
  experience: [
    {
      company: "Яндекс",
      position: "Senior Frontend Developer",
      startDate: "Январь 2022",
      endDate: "Настоящее время",
      description:
        "Разработка и поддержка ключевых компонентов Яндекс.Маркета. Оптимизация производительности, снижение LCP на 40%. Менторинг junior-разработчиков, код-ревью, внедрение TypeScript strict mode.",
      isCurrentJob: true,
    },
    {
      company: "СберТех",
      position: "Frontend Developer",
      startDate: "Март 2019",
      endDate: "Декабрь 2021",
      description:
        "Разработка внутренних банковских приложений на React + Redux. Создание UI-библиотеки компонентов с Storybook. Интеграция с REST и GraphQL API.",
    },
    {
      company: "Digital Agency «Pixel»",
      position: "Junior Frontend Developer",
      startDate: "Июнь 2017",
      endDate: "Февраль 2019",
      description:
        "Вёрстка лендингов и корпоративных сайтов. Работа с WordPress и кастомными темами. Переход на React для SPA-проектов.",
    },
  ],
  education: [
    {
      institution: "МГУ им. М.В. Ломоносова",
      degree: "Магистр, Прикладная математика и информатика",
      startDate: "2015",
      endDate: "2017",
      description:
        "Дипломная работа: «Оптимизация рендеринга сложных UI-компонентов в веб-приложениях»",
    },
    {
      institution: "МГТУ им. Н.Э. Баумана",
      degree: "Бакалавр, Информатика и вычислительная техника",
      startDate: "2011",
      endDate: "2015",
      description: "Специализация в области разработки программного обеспечения",
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Redux",
        "Zustand",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST API", "GraphQL"],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "Docker",
        "Webpack",
        "Vite",
        "Jest",
        "Playwright",
        "Figma",
        "CI/CD",
      ],
    },
  ],
  projects: [
    {
      name: "React Component Library",
      description:
        "Open-source библиотека UI-компонентов с поддержкой тем, accessibility и TypeScript. 2000+ звёзд на GitHub.",
      technologies: ["React", "TypeScript", "Storybook", "Rollup"],
      link: "https://github.com/alexpetrov/ui-kit",
    },
    {
      name: "Task Management App",
      description:
        "Full-stack приложение для управления задачами с real-time обновлениями, drag & drop и аналитикой продуктивности.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "WebSocket"],
      link: "https://taskflow.app",
    },
  ],
  languages: [
    { language: "Русский", level: "Родной" },
    { language: "Английский", level: "C1 (Advanced)" },
    { language: "Немецкий", level: "A2 (Elementary)" },
  ],
  certifications: [
    {
      name: "AWS Certified Developer — Associate",
      organization: "Amazon Web Services",
      date: "Март 2023",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      organization: "Meta (Coursera)",
      date: "Ноябрь 2022",
    },
  ],
};
