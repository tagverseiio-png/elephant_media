'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, adminSetup } from '@/lib/adminApi';

export default function AdminLogin() {
  const router = useRouter();
  const [isSetup, setIsSetup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSetup) {
        await adminSetup(username, password);
        // Setup successful, switch to login
        setIsSetup(false);
        setError('Setup successful! Please log in.');
      } else {
        const data = await adminLogin(username, password);
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      }
    } catch (err) {
      setError(err.message);
      // If setup failed because admin already exists, this will catch it
      if (err.message.includes('already exists')) {
         setIsSetup(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#111', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #333' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px', textAlign: 'center' }}>
          {isSetup ? 'Setup Admin' : 'Admin Login'}
        </h1>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: '24px', fontSize: '0.9rem' }}>
          THE ELEPHANT MEDIA
        </p>

        {error && (
          <div style={{ padding: '10px', background: error.includes('successful') ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)', color: error.includes('successful') ? '#4ade80' : '#ff4444', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px', outline: 'none' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#aaa' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px', outline: 'none' }} 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}
          >
            {loading ? 'Processing...' : (isSetup ? 'Create Admin' : 'Login')}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            type="button" 
            onClick={() => setIsSetup(!isSetup)}
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}
          >
            {isSetup ? 'Already have an account? Login' : 'First time? Setup Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}
