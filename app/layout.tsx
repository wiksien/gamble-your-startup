"use client";

import { useState, useEffect } from 'react';
import "./globals.css";
import type { Metadata } from 'next'
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
        <script defer src="http://umami-kk0oo8wkosg8gggos84sc4k8.5.161.97.168.sslip.io/script.js" data-website-id="9ea9b781-deb6-49a2-8e17-764fedb009da"></script>
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
