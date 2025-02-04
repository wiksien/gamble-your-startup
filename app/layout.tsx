"use client";

import { useState, useEffect } from 'react';
import "./globals.css";
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://umami.catpicturedaily.com/script.js"
          data-website-id="18cb3c37-bf6a-4607-80ca-f8bc2546d7a9"
        />
      </head>
      <body className={inter.className}>
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {children}
      </body>
    </html>
  )
}
