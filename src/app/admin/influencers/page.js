'use client';
import { useState, useEffect } from 'react';
import { adminUpdateData } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, InputGroup, Input, Textarea, Toast, ArrayBuilder } from '../components/AdminComponents';
import { Star, Image as ImageIcon } from 'lucide-react';
import styles from '../AdminUI.module.css';

export default function AdminInfluencers() {
  const [data, setData] = useState({
    heroTitle: '',
    heroText: '',
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/influencers')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpdateData('influencers', data);
      setToast({ message: 'Influencers page updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div>
      <PageHeader title="Edit Influencers Page" onSave={handleSave} saving={saving} />

      <div className={styles.gridFull}>
        <Card>
          <CardHeader icon={<Star size={20} />}>Hero Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Hero Title">
              <Input value={data.heroTitle || ''} onChange={e => setData({...data, heroTitle: e.target.value})} />
            </InputGroup>
            <InputGroup label="Hero Text">
              <Textarea value={data.heroText || ''} onChange={e => setData({...data, heroText: e.target.value})} />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <CardHeader icon={<ImageIcon size={20} />}>Influencers Grid</CardHeader>
          <ArrayBuilder
            items={data.items || []}
            onChange={newArr => setData({...data, items: newArr})}
            newItemTemplate={() => ({ brand: '', title: '', category: '', imageUrl: '' })}
            renderItem={(item, updateItem) => (
              <div className={styles.grid}>
                <InputGroup label="Brand Name">
                  <Input value={item.brand || ''} onChange={e => updateItem({...item, brand: e.target.value})} />
                </InputGroup>
                <InputGroup label="Title">
                  <Input value={item.title || ''} onChange={e => updateItem({...item, title: e.target.value})} />
                </InputGroup>
                <InputGroup label="Category">
                  <Input value={item.category || ''} onChange={e => updateItem({...item, category: e.target.value})} />
                </InputGroup>
                <InputGroup label="Image URL">
                  <Input value={item.imageUrl || ''} onChange={e => updateItem({...item, imageUrl: e.target.value})} />
                </InputGroup>
              </div>
            )}
          />
        </Card>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
