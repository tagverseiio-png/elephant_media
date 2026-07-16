'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import SnowParticles from '@/components/SnowParticles/SnowParticles';
import { motion } from 'framer-motion';
import { getWorkData } from '@/lib/api';
import styles from './work.module.css';

export default function WorkPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const { hero, categories, offerSection } = data;

  const ArrowIcon = () => (
    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
          </div>
        </section>

        <section className={styles.workSection}>
          <SnowParticles />
          <div className={styles.workList}>
            {categories.map((cat, idx) => (
              <motion.div
                className={styles.workRow}
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * (idx % 2) }}
              >
                <div className={styles.workText} style={{ backgroundColor: cat.color }}>
                  <div className={styles.workCategoryLabel}>
                    <span>{cat.category}</span>
                  </div>
                  <div className={styles.workBrands}>
                    {cat.slug ? (
                      <Link href={`/work/${cat.slug}`} className={styles.brandLink}>
                        <h2 className={styles.mainBrand}>
                          {cat.mainBrand}
                          {cat.hasIcon && (
                            <span className={styles.arrowIcon}><ArrowIcon /></span>
                          )}
                        </h2>
                      </Link>
                    ) : (
                      <h2 className={styles.mainBrand}>
                        {cat.mainBrand}
                        {cat.hasIcon && (
                          <span className={styles.arrowIcon}><ArrowIcon /></span>
                        )}
                      </h2>
                    )}
                    <div className={styles.otherBrandsWrapper}>
                      {cat.otherBrands.map((brand, i) => (
                        <h3 className={styles.otherBrand} key={i}>{brand}</h3>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.workImage}>
                  <div className={styles.imagePlaceholder} style={{ backgroundImage: `url(${cat.imageUrl})` }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.offerSectionWrapper}>
          <div className={styles.offerSection}>
            <div className={styles.offerLeft}>
              <h2 className={styles.offerTitle}>{offerSection.title}</h2>
            </div>
            <div className={styles.offerRight}>
              <Link href={offerSection.btnLink} className={styles.offerBtn}>
                <span className={styles.offerBtnCircle}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                <span>{offerSection.btnText}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
