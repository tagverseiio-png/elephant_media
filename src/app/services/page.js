'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';
import { getServicesData } from '@/lib/api';
import styles from './services.module.css';

export default function ServicesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicesData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const { hero, services, cta } = data;

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.pageHero}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>{hero.label}</span>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.heroSub}>{hero.subtitle}</p>
          </div>
        </section>

        <section className={styles.servicesSection}>
          {services.map((service, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={service.number}
                className={`${styles.serviceRow} ${isReversed ? styles.reversed : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={styles.serviceImageWrap}>
                  <img src={service.imageUrl} alt={service.imageAlt} className={styles.serviceImage} />
                </div>
                <div className={styles.serviceTextWrap}>
                  <span className={styles.serviceNumber}>{service.number}</span>
                  <h2 className={styles.serviceTitle}>{service.title}</h2>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feat, fi) => (
                      <li key={fi} className={styles.featureItem}>
                        <span className={styles.featureDot}></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.serviceLine}></div>
                </div>
              </motion.div>
            );
          })}
        </section>

        <section className={styles.ctaSection}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className={styles.ctaTitle}>{cta.title}</h2>
            <a href={`mailto:${cta.email}`} className={styles.ctaBtn}>
              <span>{cta.btnText}</span>
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
