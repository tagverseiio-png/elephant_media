'use client';
import { useState, useEffect } from 'react';
import { adminGetFeedbacks, adminDeleteFeedback } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, Button, Toast } from '../components/AdminComponents';
import { MessageSquare, Trash2 } from 'lucide-react';
import styles from '../AdminUI.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const data = await adminGetFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      await adminDeleteFeedback(id);
      setFeedbacks(feedbacks.filter(f => f._id !== id));
      setToast({ message: 'Feedback deleted', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  if (loading) return null;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Feedbacks & Inquiries</h1>
      </div>

      <div className={styles.gridFull}>
        {feedbacks.length === 0 ? (
          <Card>
            <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              <MessageSquare size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
              <p>No feedbacks yet. You're all caught up!</p>
            </div>
          </Card>
        ) : (
          <AnimatePresence>
            {feedbacks.map((f) => (
              <motion.div 
                key={f._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={styles.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>{f.name}</h3>
                      <a href={`mailto:${f.email}`} style={{ color: '#aaa', fontSize: '0.9rem', textDecoration: 'none' }}>{f.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(f.createdAt).toLocaleString()}</span>
                      <button 
                        onClick={() => handleDelete(f._id)}
                        style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', opacity: 0.7 }}
                        title="Delete Feedback"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {f.phone && (
                    <div style={{ marginBottom: '15px', color: '#888', fontSize: '0.9rem' }}>
                      <strong>Phone:</strong> {f.phone}
                    </div>
                  )}

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', color: '#ddd', lineHeight: '1.6', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {f.message}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
