'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { adminVerifyToken } from '@/lib/adminApi';
import { LayoutDashboard, LogOut, Home, User, Briefcase, Star, Users, MessageSquare } from 'lucide-react';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login' || pathname === '/admin/setup') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    adminVerifyToken().then((valid) => {
      if (valid) {
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    });
  }, [pathname, router]);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}>Loading...</div>;
  }

  if (pathname === '/admin/login' || pathname === '/admin/setup') {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Home', path: '/admin/home', icon: <Home size={20} /> },
    { name: 'About', path: '/admin/about', icon: <User size={20} /> },
    { name: 'Services', path: '/admin/services', icon: <Briefcase size={20} /> },
    { name: 'Influencers', path: '/admin/influencers', icon: <Star size={20} /> },
    { name: 'Works', path: '/admin/works', icon: <Users size={20} /> },
    { name: 'Feedbacks', path: '/admin/feedbacks', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <aside style={{ width: '250px', backgroundColor: '#111', borderRight: '1px solid #333', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '2px', fontWeight: 600 }}>THE ELEPHANT<br/><span style={{fontSize: '0.8rem', color: '#aaa'}}>ADMIN</span></h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', borderRadius: '8px',
                textDecoration: 'none',
                color: pathname === item.path ? '#fff' : '#888',
                backgroundColor: pathname === item.path ? '#333' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 15px', background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', textAlign: 'left', marginTop: 'auto' }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
