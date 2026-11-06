import React from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Globe,
  Database,
  Layers,
  Server,
  Zap,
  GitBranch,
} from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const normalized = name.toLowerCase().trim();

  // React
  if (normalized.includes('react')) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00d8ff" />
        <g stroke="#00d8ff" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#3178C6" />
        <path
          d="M19.5 13.5H24.5V15.5H22V24H19.5V15.5H17V13.5H19.5ZM10.5 18.5C10.5 17.5 11.2 16.8 12.5 16.8C14 16.8 15 17.5 15.2 18.8L13.2 19.2C13.1 18.5 12.8 18.2 12.4 18.2C12 18.2 11.8 18.4 11.8 18.7C11.8 19.1 12.1 19.3 12.8 19.6L13.5 19.9C14.8 20.4 15.6 21.1 15.6 22.4C15.6 23.8 14.4 24.8 12.6 24.8C10.8 24.8 9.8 23.8 9.5 22.3L11.5 21.9C11.6 22.8 12.1 23.3 12.7 23.3C13.2 23.3 13.5 23 13.5 22.6C13.5 22.2 13.2 21.9 12.5 21.6L11.8 21.3C10.7 20.8 10.5 20 10.5 18.5Z"
          fill="white"
        />
      </svg>
    );
  }

  // JavaScript
  if (normalized.includes('javascript') || normalized.includes('js')) {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="6" fill="#F7DF1E" />
        <path
          d="M17.5 14H19.8V21.6C19.8 24.2 18.2 25.4 15.8 25.4C13.6 25.4 12.3 24.2 11.6 22.7L13.6 21.5C14.1 22.4 14.8 23.1 15.8 23.1C16.8 23.1 17.5 22.6 17.5 21.3V14ZM26 14H28.3V21.6C28.3 24.2 26.7 25.4 24.3 25.4C22.1 25.4 20.8 24.2 20.1 22.7L22.1 21.5C22.6 22.4 23.3 23.1 24.3 23.1C25.3 23.1 26 22.6 26 21.3V14Z"
          fill="#1C1C1C"
        />
        <path
          d="M12.5 14H14.8V21.8C14.8 23.8 13.6 24.9 11.7 24.9C10 24.9 8.9 24 8.2 22.6L10.1 21.4C10.5 22.1 11 22.7 11.7 22.7C12.3 22.7 12.5 22.3 12.5 21.5V14Z"
          fill="#1C1C1C"
        />
        <path
          d="M21.5 14H24V18.8C24.4 17.8 25.4 17.2 26.6 17.2C28.7 17.2 29.8 18.6 29.8 20.8V25H27.5V21.2C27.5 19.9 26.9 19.3 25.8 19.3C24.7 19.3 24 20.1 24 21.4V25H21.5V14Z"
          fill="#1C1C1C"
        />
      </svg>
    );
  }

  // Tailwind CSS
  if (normalized.includes('tailwind')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // HTML5
  if (normalized.includes('html')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4.1 2L5.8 20.8L12 22.5L18.2 20.8L19.9 2H4.1Z" fill="#E44D26" />
        <path d="M12 3.8V20.7L16.8 19.3L18.2 3.8H12Z" fill="#F16529" />
        <path d="M12 7.7H8L8.3 11H12V7.7ZM12 13.8H9.7L9.9 16.4L12 17V19.1L8.8 18.2L8.5 15H12V13.8Z" fill="#EBEBEB" />
        <path d="M12 7.7V11H15.6L15.3 13.8H12V15H15.2L14.9 18.2L12 19.1V17L14 16.4L14.2 13.8H12V13.8H16L16.4 7.7H12Z" fill="white" />
      </svg>
    );
  }

  // CSS3
  if (normalized.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M4.1 2L5.8 20.8L12 22.5L18.2 20.8L19.9 2H4.1Z" fill="#1572B6" />
        <path d="M12 3.8V20.7L16.8 19.3L18.2 3.8H12Z" fill="#33A9DC" />
        <path d="M12 7.7H7.7L8 11H12V7.7ZM12 13.8H9.7L9.9 16.4L12 17V19.1L8.8 18.2L8.5 15H12V13.8Z" fill="#EBEBEB" />
        <path d="M12 7.7V11H15.6L15.3 13.8H12V15H15.2L14.9 18.2L12 19.1V17L14 16.4L14.2 13.8H12V13.8H16L16.4 7.7H12Z" fill="white" />
      </svg>
    );
  }

  // Redux / Zustand
  if (normalized.includes('redux') || normalized.includes('zustand')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M16.5 13C16.5 14.933 14.933 16.5 13 16.5C11.067 16.5 9.5 14.933 9.5 13C9.5 11.067 11.067 9.5 13 9.5C14.933 9.5 16.5 11.067 16.5 13Z"
          fill="#764ABC"
        />
        <path
          d="M7.7 7.7C5.2 10.2 5.2 14.3 7.7 16.8C10.2 19.3 14.3 19.3 16.8 16.8C17.5 16.1 18 15.3 18.3 14.4C18.6 13.5 18.4 12.6 17.8 12C17.2 11.4 16.3 11.2 15.4 11.5C14.5 11.8 13.7 12.3 13 13C12.3 13.7 11.8 14.5 11.5 15.4C11.2 16.3 11.4 17.2 12 17.8C12.6 18.4 13.5 18.6 14.4 18.3C15.3 18 16.1 17.5 16.8 16.8"
          stroke="#764ABC"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Git / GitHub
  if (normalized.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21.6 10.8L13.2 2.4C12.7 1.9 11.8 1.9 11.3 2.4L9.5 4.2L12 6.7C12.6 6.5 13.3 6.6 13.8 7.1C14.3 7.6 14.4 8.3 14.2 8.9L16.6 11.3C17.2 11.1 17.9 11.2 18.4 11.7C19.1 12.4 19.1 13.6 18.4 14.3C17.7 15 16.5 15 15.8 14.3C15.3 13.8 15.2 13.1 15.4 12.5L13.2 10.3V15.7C13.4 15.9 13.5 16.2 13.5 16.5C13.5 17.6 12.6 18.5 11.5 18.5C10.4 18.5 9.5 17.6 9.5 16.5C9.5 15.7 10 15 10.7 14.7V9.3C10 9 9.5 8.3 9.5 7.5C9.5 7.2 9.6 6.9 9.7 6.7L7.2 4.2L2.4 9C1.9 9.5 1.9 10.4 2.4 10.9L10.8 19.3C11.3 19.8 12.2 19.8 12.7 19.3L21.6 10.4C22.1 9.9 22.1 9 21.6 8.5V10.8Z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // Vite
  if (normalized.includes('vite')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21.8 3.5L12.7 20.3C12.4 20.9 11.6 20.9 11.3 20.3L2.2 3.5C1.8 2.8 2.3 2 3.1 2H20.9C21.7 2 22.2 2.8 21.8 3.5Z"
          fill="url(#viteGrad)"
        />
        <path
          d="M14.5 2.5L7.8 11.5H12.2L10.5 18.5L17.2 8.5H12.8L14.5 2.5Z"
          fill="#FFD200"
        />
        <defs>
          <linearGradient id="viteGrad" x1="2" y1="2" x2="22" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // NestJS
  if (normalized.includes('nest')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M20.2 4.8C18.6 3.2 16.4 2.2 14 2.2C10.5 2.2 7.4 4.2 5.9 7.2C4.5 6.6 2.8 7.3 2.2 8.8C1.6 10.2 2.3 11.9 3.8 12.5C3.7 13 3.7 13.5 3.7 14C3.7 18.4 7.3 22 11.7 22C14.1 22 16.3 20.9 17.8 19.2C18.8 19.7 20 19.6 20.9 18.8C21.9 17.8 22 16.3 21.4 15.2C21.7 14.2 21.8 13.1 21.8 12C21.8 9.3 21.2 6.8 20.2 4.8Z"
          fill="#E0234E"
        />
        <path
          d="M14.2 8.5C12.5 8.5 11.2 9.8 11.2 11.5C11.2 13.2 12.5 14.5 14.2 14.5C15.9 14.5 17.2 13.2 17.2 11.5C17.2 9.8 15.9 8.5 14.2 8.5Z"
          fill="white"
        />
      </svg>
    );
  }

  // Linux & Bash
  if (normalized.includes('linux') || normalized.includes('bash')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#22272E" />
        <path d="M6 8L10 12L6 16" stroke="#4EDE8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16H18" stroke="#4EDE8A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // REST API
  if (normalized.includes('api') || normalized.includes('rest')) {
    return (
      <div className={`${className} flex items-center justify-center font-mono font-bold text-[10px] text-emerald-400 bg-emerald-500/15 rounded-md border border-emerald-500/30`}>
        API
      </div>
    );
  }

  // Computer Science Asoslari
  if (normalized.includes('computer science') || normalized.includes('cs')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1E1B4B" />
        <path
          d="M8 8H16V16H8V8Z"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M4 10H8M4 14H8M16 10H20M16 14H20M10 4V8M14 4V8M10 16V20M14 16V20" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Tilda
  if (normalized.includes('tilda')) {
    return (
      <div className={`${className} flex items-center justify-center font-bold text-xs text-orange-400 bg-orange-500/15 rounded-md border border-orange-500/30`}>
        T
      </div>
    );
  }

  // Default fallback icon
  return <Code className={`${className} text-primary-container`} />;
};
