'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import SnowParticles from '@/components/SnowParticles/SnowParticles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getHomeData } from '@/lib/api';
import styles from './page.module.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.12]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 0.6, 0]);

  useEffect(() => {
    getHomeData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const { hero, marqueeBrands, bentoGrid, instagram } = data;

  return (
    <>
      <Navbar isHome />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <video autoPlay loop muted playsInline className={styles.heroVideo}>
              <source src={hero.videoUrl} type="video/mp4" />
            </video>
            <div className={styles.heroOverlay}></div>
            <SnowParticles />
          </div>
          <motion.h1
            className={styles.heroGiantTitle}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          >
            THE ELEPHANT MEDIA
          </motion.h1>
          <div className={styles.heroContent}>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link href={hero.btnLink} className={styles.heroBtn}>
                <span>{hero.btnText}</span>
              </Link>
            </motion.div>
          </div>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              <span className={styles.marqueeText}>
                {marqueeBrands.join(' • ')} • {marqueeBrands.join(' • ')} •&nbsp;
              </span>
              <span className={styles.marqueeText}>
                {marqueeBrands.join(' • ')} • {marqueeBrands.join(' • ')} •&nbsp;
              </span>
            </div>
          </div>
        </section>

        <section className={styles.bentoSection}>
          {bentoGrid.map((item, i) => (
            <motion.div
              key={i}
              className={styles.bentoRow}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i === 0 ? 0 : 0.1 }}
            >
              {i % 2 === 0 ? (
                <>
                  <div className={`${styles.bentoItem} ${styles.imageItem}`}>
                    {item.mediaType === 'video' ? (
                      <video autoPlay loop muted playsInline preload="none" className={styles.imagePlaceholder}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
                        <source src={item.imageUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={item.imageUrl} alt={item.title} className={styles.imagePlaceholder}
                        loading="lazy" decoding="async" />
                    )}
                  </div>
                  <div className={`${styles.bentoItem} ${styles.textItem}`} style={{ backgroundColor: item.bgColor }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                      <span className={styles.bentoLabel}>{item.label}</span>
                      <h2 className={styles.bentoTitle}>{item.title}</h2>
                      <p className={styles.bentoDesc}>{item.description}</p>
                    </motion.div>
                    <Link href={item.btnLink} className={styles.bentoBtn}>
                      <span className={styles.bentoBtnCircle}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                      <span>{item.btnText}</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.bentoItem} ${styles.textItem}`} style={{ backgroundColor: item.bgColor }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                      <span className={styles.bentoLabel}>{item.label}</span>
                      <h2 className={styles.bentoTitle}>{item.title}</h2>
                      <p className={styles.bentoDesc}>{item.description}</p>
                    </motion.div>
                    <Link href={item.btnLink} className={styles.bentoBtn}>
                      <span className={styles.bentoBtnCircle}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                      <span>{item.btnText}</span>
                    </Link>
                  </div>
                  <div className={`${styles.bentoItem} ${styles.imageItem}`}>
                    <img src={item.imageUrl} alt={item.title} className={styles.imagePlaceholder}
                      loading="lazy" decoding="async" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </section>

        <section className={styles.instagramSection}>
          <div className={styles.instaHeader}>
            <h2 className={styles.instaTitle}>{instagram.title}</h2>
            <a href={instagram.handleUrl} target="_blank" rel="noopener noreferrer" className={styles.instaLink}>
              {instagram.handle}
            </a>
          </div>
          <div className={styles.instaCarousel}>
            <div className={styles.instaCarouselTrack}>
              {[...instagram.images, ...instagram.images].map((src, i) => (
                <div key={i} className={styles.instaBox}>
                  <img src={src} alt="Instagram post" loading="lazy" decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
