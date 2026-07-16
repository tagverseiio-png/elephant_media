'use client';
import { useState, useEffect } from 'react';
import { submitFeedback } from '@/lib/api';
import styles from './ContactSidebar.module.css';

export default function ContactSidebar({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      await submitFeedback(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close Contact">
          ✕
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>Drop us<br />a line.</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-name">
                NAME <span className={styles.asterisk}>*</span>
              </label>
              <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-email">
                EMAIL <span className={styles.asterisk}>*</span>
              </label>
              <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-phone">
                PHONE/MOBILE <span className={styles.asterisk}>*</span>
              </label>
              <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="contact-message">
                YOUR MESSAGE <span className={styles.asterisk}>*</span>
              </label>
              <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} className={styles.textarea} required />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              <span className={styles.submitIcon}>↗</span>
              {submitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
            {status === 'success' && <p className={styles.successMsg}>Message sent successfully!</p>}
            {status === 'error' && <p className={styles.errorMsg}>Failed to send. Please try again.</p>}
          </form>

          <div className={styles.emailContact}>
            <a href="mailto:info@azionepr.com">info@azionepr.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
