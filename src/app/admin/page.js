'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminGetFeedbacks } from '@/lib/adminApi';
import { MessageSquare, Briefcase, Star, Users, ArrowRight } from 'lucide-react';
import { Card, CardHeader } from './components/AdminComponents';
import styles from './AdminUI.module.css';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetFeedbacks()
      .then(d => { setFeedbacks(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const stats = [
    { label: 'Unread Feedbacks', value: loading ? '-' : feedbacks.length, icon: <MessageSquare /> },
    { label: 'Manage Works', link: '/admin/works', icon: <Users /> },
    { label: 'Manage Services', link: '/admin/services', icon: <Briefcase /> },
    { label: 'Manage Influencers', link: '/admin/influencers', icon: <Star /> },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>
      
      <div className={styles.grid} style={{ marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#888', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
                {stat.icon}
              </div>
              {stat.link ? (
                <Link href={stat.link} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' }}>
                  Open Editor <ArrowRight size={20} />
                </Link>
              ) : (
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{stat.value}</div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader icon={<MessageSquare size={20} />}>Recent Feedbacks</CardHeader>
        <div style={{ overflowX: 'auto', marginTop: '10px' }}>
          {loading ? (
            <div style={{ color: '#666' }}>Loading...</div>
          ) : feedbacks.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No recent feedbacks.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#888', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', fontWeight: 500 }}>Name</th>
                  <th style={{ padding: '12px 15px', fontWeight: 500 }}>Email</th>
                  <th style={{ padding: '12px 15px', fontWeight: 500 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.slice(0, 5).map((f) => (
                  <tr key={f._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '15px', color: '#ddd' }}>{f.name}</td>
                    <td style={{ padding: '15px', color: '#aaa' }}>{f.email}</td>
                    <td style={{ padding: '15px', color: '#888' }}>{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
