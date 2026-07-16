'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';
import { getInfluencersData } from '@/lib/api';
import styles from './influencers.module.css';

export default function InfluencersPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfluencersData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const { heroTitle, heroText, items } = data;

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{heroTitle}</h1>
            <div className={styles.heroRight}>
              <p className={styles.heroText}>{heroText}</p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.grid}>
            {items.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                className={styles.gridItem}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * (idx % 2) }}
              >
                <div className={styles.imageWrapper}>
                  <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemBrand}>{item.brand}</p>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
