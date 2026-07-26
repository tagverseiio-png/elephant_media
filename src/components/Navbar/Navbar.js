'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSidebar from '../ContactSidebar/ContactSidebar';
import styles from './Navbar.module.css';

export default function Navbar({ isHome = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(!isHome);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        if (isHome) {
          setLogoVisible(y > window.innerHeight * 0.35);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.navLinksLeft}>
            <Link href="/work" className={styles.navLink}>WORK</Link>
            <Link href="/services" className={styles.navLink}>SERVICES</Link>
            <Link href="/influencers" className={styles.navLink}>INFLUENCER COLLABORATIONS</Link>
          </div>

          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={`${styles.logoText} ${logoVisible ? styles.logoVisible : styles.logoHidden}`}>
              The Elephant Media
            </span>
          </Link>

          <div className={styles.navLinksRight}>
            <Link href="/about" className={styles.navLink}>ABOUT</Link>
            <a href="https://www.instagram.com/theelephantmedia/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>INSTAGRAM</a>
            <button 
              className={styles.navLink} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => setContactOpen(true)}
            >
              CONTACT
            </button>
          </div>
        </div>
      </nav>

      <ContactSidebar isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
