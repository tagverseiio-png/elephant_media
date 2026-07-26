'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import ContactSidebar from '../ContactSidebar/ContactSidebar';

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerGiantText}>
          THE ELEPHANT
        </div>
        <div className={styles.footerBottomRow}>
          <div className={styles.footerLeft}>
            <span>© The Elephant Media 2026</span>
          </div>
          <div className={styles.footerCenter}>
            <Link href="/work">WORK</Link>
            <Link href="/services">SERVICES</Link>
            <Link href="/influencers">INFLUENCERS</Link>
            <Link href="/about">ABOUT</Link>
            <a href="https://www.instagram.com/theelephantmedia/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
          </div>
          <div className={styles.footerRight}>
            <a href="mailto:info@theelephantmedia.com">INFO@THEELEPHANTMEDIA.COM</a>
            <button
              className={styles.contactBtn}
              onClick={() => setContactOpen(true)}
            >
              CONTACT
            </button>
          </div>
        </div>
      </footer>
      <ContactSidebar isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
