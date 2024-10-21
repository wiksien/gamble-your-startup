"use client";

import { useState, useEffect } from 'react';
import { categories } from './categories';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [subject, setSubject] = useState("Gamble");
  const [form, setForm] = useState("a startup");
  const [audience, setAudience] = useState("you");
  const [locked, setLocked] = useState({ subject: false, form: false, audience: false });
  const [hasGambled, setHasGambled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Add this new state to control the bold styling of "you"
  const [isYouBold, setIsYouBold] = useState(true);

  const handleButtonClick = () => {
    if (Object.values(locked).every(value => value)) {
      // If all values are locked (Congrats state), open Ko-fi page
      window.open('https://ko-fi.com/wiktorsienkiewicz', '_blank', 'noopener,noreferrer');
    } else {
      // Otherwise, perform the gamble action
      gamble();
    }
  };

  const gamble = () => {
    if (!hasGambled) {
      setHasGambled(true);
      // Remove the bold styling from "you" when the button is clicked
      setIsYouBold(false);
    }
    if (!locked.subject) setSubject(getRandomItem(categories.subjects));
    if (!locked.form) setForm(getRandomItem(categories.forms));
    if (!locked.audience) setAudience(getRandomItem(categories.targetAudiences));
  };

  const getRandomItem = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const toggleLock = (key: 'subject' | 'form' | 'audience') => {
    if (hasGambled) {
      setLocked(prev => {
        const newLocked = { ...prev, [key]: !prev[key] };
        if (Object.values(newLocked).every(value => value)) {
          setShowConfetti(true);
        }
        return newLocked;
      });
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Confetti will show for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const LockableText = ({ text, type }: { text: string; type: 'subject' | 'form' | 'audience' }) => (
    <span 
      className={`relative cursor-pointer ${locked[type] ? 'font-bold' : ''} ${hasGambled ? 'hover:bg-[var(--highlight-bg)]' : ''} transition-colors duration-200 group ${type === 'audience' && isYouBold ? 'font-bold' : ''}`}
      onClick={() => toggleLock(type)}
    >
      {hasGambled && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {locked[type] ? 'Unlock' : 'Lock'}
        </span>
      )}
      {text}
    </span>
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        {showConfetti && <Confetti
          recycle={false}
          numberOfPieces={1000}
          wind={0.01}
        />}
        <div className="z-10 w-full max-w-[90vw] items-center justify-between font-mono flex flex-col">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${subject}-${form}-${audience}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-5xl mb-12 text-center"
            >
              <LockableText text={subject} type="subject" /> <LockableText text={form} type="form" /> for <LockableText text={audience} type="audience" />
            </motion.p>
          </AnimatePresence>
          <div className="mt-4">
            <button
              onClick={handleButtonClick}
              className="px-8 py-4 text-2xl font-semibold text-[var(--button-text)] bg-[var(--button-bg)] rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-75 border border-[var(--button-border)] transition-all duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
              style={{
                boxShadow: `0 0 0 3px var(--button-bg), 3px 3px 0 3px var(--button-border), 6px 6px 0 3px var(--button-shadow)`,
              }}
            >
              {Object.values(locked).every(value => value) ? "Congrats!" : "Let's go gambling!"}
            </button>
          </div>
        </div>
      </main>
      
      <footer className="w-full py-4 px-6 flex flex-col items-center relative">
        <a 
          href="https://ko-fi.com/wiktorsienkiewicz" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center text-sm text-[var(--text)] opacity-70 hover:opacity-100 transition-opacity duration-200 mb-2"
        >
          <span>I'm broke. Consider throwing a coin.</span>
          <Image src="/kofi-logo.png" alt="Ko-fi" width={20} height={20} className="ml-2 rounded-full" />
        </a>
        <Link 
          href="https://x.com/wiksien" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-[var(--text)] opacity-70 hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-6"
        >
          Wiktor Sienkiewicz © {currentYear}
        </Link>
      </footer>
    </div>
  );
}
