'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { getWorkDetail } from '@/lib/api';
import styles from './detail.module.css';

export default function WorkDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getWorkDetail(slug)
      .then((detail) => {
        if (!detail) { setNotFound(true); return; }
        setData(detail);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return null;
  if (notFound || !data) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div style={{ padding: '10rem 1.5vw', textAlign: 'center' }}>
            <h1>Work not found</h1>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { clientName, title, services, visitUrl, images, socialImages, eventSeries, moreWork, ctaTitle } = data;

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeText}>
            <span>THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x </span>
            <span>THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x THE ELEPHANT {clientName} x </span>
          </div>
        </div>

        <section className={styles.detailSection}>
          <div className={styles.stickyCol}>
            <p className={styles.clientName}>{clientName}</p>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={styles.servicesList}>
              {services.map((s, i) => (
                <p key={i}>{s}</p>
              ))}
            </div>
            {visitUrl && (
              <a href={visitUrl} className={styles.visitLink}>
                <span className={styles.linkCircle}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H2M9 1V8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
                VISIT WEBSITE
              </a>
            )}
          </div>
          <div className={styles.scrollCol}>
            <div className={styles.imageGrid}>
              {images.gridFull && images.gridFull.map((src, i) => (
                <div key={`full-${i}`} className={styles.gridFull}>
                  <img src={src} alt={`${clientName} ${i}`} />
                </div>
              ))}
              {images.gridHalf && images.gridHalf.map((src, i) => (
                <div key={`half-${i}`} className={styles.gridHalf}>
                  <img src={src} alt={`${clientName} ${i}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {socialImages && socialImages.length > 0 && (
          <section className={styles.socialBanner}>
            <div className={styles.socialGrid}>
              {socialImages.map((src, i) => (
                <div key={i} className={styles.socialPost}>
                  <img src={src} alt={`Post ${i + 1}`} />
                </div>
              ))}
            </div>
          </section>
        )}

        {eventSeries && (
          <section className={styles.eventSeries}>
            <h2 className={styles.eventTitle}>{eventSeries.title}</h2>
            <div className={styles.eventTextGrid}>
              {eventSeries.paragraphs.map((p, i) => (
                <p key={i} className={styles.eventText}>{p}</p>
              ))}
            </div>
            {eventSeries.images && (
              <div className={styles.eventImageGrid}>
                {eventSeries.images.map((src, i) => (
                  <div key={i} className={styles.eventImgWrapper}>
                    <img src={src} alt={`Event ${i + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {moreWork && moreWork.length > 0 && (
          <section className={styles.moreWork}>
            <div className={styles.moreWorkHeader}>
              <h3>More Work</h3>
              <div className={styles.moreWorkNav}>
                <span className={styles.navDot}></span>
                <span className={styles.navDot}></span>
              </div>
            </div>
            <div className={styles.moreWorkGrid}>
              {moreWork.map((item, i) => (
                <Link key={i} href={item.slug ? `/work/${item.slug}` : '#'} className={styles.moreWorkCard}>
                  <img src={item.imageUrl} alt={item.title} />
                  <p>{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {ctaTitle}<br />
            Let&rsquo;s talk. <span className={styles.ctaDash}>—</span>
          </h2>
        </section>
      </main>
      <Footer />
    </>
  );
}
