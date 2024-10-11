'use client';

import React, { startTransition, useState } from 'react';
import { useRouter } from './framework/router';

import './style/Layout.css';
import './style/Home.css';

const Layout = ({ children }) => {
  const { navigate, path } = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleClick = (nextPath) => {
    startTransition(() => {
      navigate(nextPath);
    });
  };

  const handleThemeClick = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
  };

  return (
    <div className={isDark ? 'container dark' : 'container white'}>
      <header className="header">
        <ul>
          <li className={path === 'home' ? 'active' : undefined}>
            <span
              onClick={() => {
                handleClick('home');
              }}
            >
              Home
            </span>
          </li>
          <li className={path === 'about' ? 'active' : undefined}>
            <span
              onClick={() => {
                handleClick('about');
              }}
            >
              About
            </span>
          </li>
        </ul>
        {isDark ? (
          <div onClick={() => setIsDark(false)}>🌞</div>
        ) : (
          <div onClick={() => setIsDark(true)}>🌙</div>
        )}
      </header>
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
