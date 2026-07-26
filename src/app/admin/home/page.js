'use client';
import { useState, useEffect } from 'react';
import { adminUpdateData } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, InputGroup, Input, Toast, StringArrayEditor, ArrayBuilder, MediaUploader } from '../components/AdminComponents';
import { Home, Type, Grid, Camera } from 'lucide-react';
import styles from '../AdminUI.module.css';

export default function AdminHome() {
  const [data, setData] = useState({
    hero: { title: '', subtitle: '', videoUrl: '', btnText: '', btnLink: '' },
    marqueeBrands: [],
    bentoGrid: [],
    instagram: { title: '', handle: '', handleUrl: '', images: [] }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/home')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpdateData('home', data);
      setToast({ message: 'Home page updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div>
      <PageHeader title="Edit Home Page" onSave={handleSave} saving={saving} />

      <div className={styles.gridFull}>
        <Card>
          <CardHeader icon={<Home size={20} />}>Hero Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Hero Title">
              <Input value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Hero Subtitle">
              <Input value={data.hero?.subtitle || ''} onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} />
            </InputGroup>
            <MediaUploader 
              label="Video URL (Upload or Paste)"
              value={data.hero?.videoUrl || ''} 
              onChange={val => setData({...data, hero: {...data.hero, videoUrl: val}})} 
              accept="video/*"
            />
          </div>
        </Card>

        <Card>
          <CardHeader icon={<Type size={20} />}>Marquee Brands</CardHeader>
          <StringArrayEditor 
            items={data.marqueeBrands || []} 
            onChange={newArr => setData({...data, marqueeBrands: newArr})} 
            placeholder="Add a brand name..."
          />
        </Card>

        <Card>
          <CardHeader icon={<Grid size={20} />}>Bento Grid Builder</CardHeader>
          <ArrayBuilder
            items={data.bentoGrid || []}
            onChange={newArr => setData({...data, bentoGrid: newArr})}
            newItemTemplate={() => ({ label: '', title: '', description: '', btnText: '', btnLink: '', imageUrl: '', bgColor: '#ffffff', mediaType: 'image' })}
            renderItem={(item, updateItem) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className={styles.grid}>
                  <InputGroup label="Label">
                    <Input value={item.label || ''} onChange={e => updateItem({...item, label: e.target.value})} placeholder="e.g. SERVICES" />
                  </InputGroup>
                  <InputGroup label="Title">
                    <Input value={item.title || ''} onChange={e => updateItem({...item, title: e.target.value})} />
                  </InputGroup>
                </div>
                <InputGroup label="Description">
                  <Input value={item.description || ''} onChange={e => updateItem({...item, description: e.target.value})} />
                </InputGroup>
                <div className={styles.grid}>
                  <InputGroup label="Button Text">
                    <Input value={item.btnText || ''} onChange={e => updateItem({...item, btnText: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Button Link">
                    <Input value={item.btnLink || ''} onChange={e => updateItem({...item, btnLink: e.target.value})} />
                  </InputGroup>
                </div>
                <div className={styles.grid}>
                  <MediaUploader 
                    label="Media URL (Image/Video)"
                    value={item.imageUrl || ''} 
                    onChange={val => updateItem({...item, imageUrl: val})} 
                    accept="image/*,video/*"
                  />
                  <InputGroup label="Background Color">
                    <Input type="color" value={item.bgColor || '#000000'} onChange={e => updateItem({...item, bgColor: e.target.value})} style={{ padding: '0', height: '40px', cursor: 'pointer' }} />
                  </InputGroup>
                </div>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardHeader icon={<Camera size={20} />}>Instagram Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Title">
              <Input value={data.instagram?.title || ''} onChange={e => setData({...data, instagram: {...data.instagram, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Handle (@)">
              <Input value={data.instagram?.handle || ''} onChange={e => setData({...data, instagram: {...data.instagram, handle: e.target.value}})} />
            </InputGroup>
          </div>
          <div style={{ marginTop: '20px' }}>
            <StringArrayEditor 
              label="Instagram Image URLs"
              items={data.instagram?.images || []} 
              onChange={newArr => setData({...data, instagram: {...data.instagram, images: newArr}})} 
              placeholder="https://..."
            />
          </div>
        </Card>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
