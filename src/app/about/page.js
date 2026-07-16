'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';
import { getAboutData } from '@/lib/api';
import styles from './about.module.css';

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const { hero, mission, values, team, testimonial } = data;

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.pageHero}>
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>{hero.label}</span>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
          </div>
        </section>

        <section className={styles.missionSection}>
          <div className={styles.missionContainer}>
            <motion.div
              className={styles.missionLeft}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className={styles.labelLine}></span>
              <span className={styles.sectionLabel}>{mission.label}</span>
            </motion.div>
            <motion.div
              className={styles.missionRight}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {mission.paragraphs.map((p, i) => (
                <p key={i} className={styles.missionText}>{p}</p>
              ))}
            </motion.div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className={styles.valuesHeader}>
            <motion.h2
              className={styles.valuesTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Our Values
            </motion.h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((value, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.teamSection}>
          <div className={styles.teamHeader}>
            <motion.div
              className={styles.sectionLabelWrap}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className={styles.labelLine}></span>
              <span className={styles.sectionLabel}>The Team</span>
            </motion.div>
            <motion.h2
              className={styles.teamTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Meet the people behind<br />the magic
            </motion.h2>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, i) => (
              <motion.div
                key={i}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
              >
                <div className={styles.teamImage} style={{ background: member.gradient }}>
                  <div className={styles.teamInitial}>{member.name.charAt(0)}</div>
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <span className={styles.teamRole}>{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.testimonialSection}>
          <motion.div
            className={styles.testimonialContent}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.quoteIcon}>&ldquo;</div>
            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
            <div className={styles.quoteAuthor}>
              <span className={styles.authorName}>{testimonial.authorName}</span>
              <span className={styles.authorRole}>{testimonial.authorRole}</span>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
