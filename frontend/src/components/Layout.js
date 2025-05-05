import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${theme === "day" ? "bg-day" : "bg-night"} min-vh-100`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} scrolled={scrolled} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;