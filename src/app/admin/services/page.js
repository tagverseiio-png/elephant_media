'use client';
import { useState, useEffect } from 'react';
import { adminUpdateData } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, InputGroup, Input, Toast, StringArrayEditor, ArrayBuilder } from '../components/AdminComponents';
import { Briefcase, Layers, Mail } from 'lucide-react';
import styles from '../AdminUI.module.css';

export default function AdminServices() {
  const [data, setData] = useState({
    hero: { label: '', title: '', subtitle: '' },
    services: [],
    cta: { title: '', btnText: '', email: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/services')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpdateData('services', data);
      setToast({ message: 'Services page updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div>
      <PageHeader title="Edit Services Page" onSave={handleSave} saving={saving} />

      <div className={styles.gridFull}>
        <Card>
          <CardHeader icon={<Briefcase size={20} />}>Hero Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Label">
              <Input value={data.hero?.label || ''} onChange={e => setData({...data, hero: {...data.hero, label: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Title">
              <Input value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Subtitle">
              <Input value={data.hero?.subtitle || ''} onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <CardHeader icon={<Layers size={20} />}>Services List</CardHeader>
          <ArrayBuilder
            items={data.services || []}
            onChange={newArr => setData({...data, services: newArr})}
            newItemTemplate={() => ({ number: '', title: '', description: '', features: [], imageUrl: '', imageAlt: '' })}
            renderItem={(item, updateItem) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className={styles.grid}>
                  <InputGroup label="Number (e.g. 01)">
                    <Input value={item.number || ''} onChange={e => updateItem({...item, number: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Title">
                    <Input value={item.title || ''} onChange={e => updateItem({...item, title: e.target.value})} />
                  </InputGroup>
                </div>
                <InputGroup label="Description">
                  <Input value={item.description || ''} onChange={e => updateItem({...item, description: e.target.value})} />
                </InputGroup>
                <div className={styles.grid}>
                  <InputGroup label="Image URL">
                    <Input value={item.imageUrl || ''} onChange={e => updateItem({...item, imageUrl: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Image Alt Text">
                    <Input value={item.imageAlt || ''} onChange={e => updateItem({...item, imageAlt: e.target.value})} />
                  </InputGroup>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                  <StringArrayEditor
                    label="Service Features"
                    items={item.features || []}
                    onChange={newFeatures => updateItem({...item, features: newFeatures})}
                    placeholder="Add a feature..."
                  />
                </div>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardHeader icon={<Mail size={20} />}>CTA Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Title">
              <Input value={data.cta?.title || ''} onChange={e => setData({...data, cta: {...data.cta, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Button Text">
              <Input value={data.cta?.btnText || ''} onChange={e => setData({...data, cta: {...data.cta, btnText: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Email Contact">
              <Input value={data.cta?.email || ''} onChange={e => setData({...data, cta: {...data.cta, email: e.target.value}})} />
            </InputGroup>
          </div>
        </Card>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
