'use client';
import { useState, useEffect } from 'react';
import { adminUpdateData } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, InputGroup, Input, Toast, StringArrayEditor, ArrayBuilder } from '../components/AdminComponents';
import { User, Users, Target, Award } from 'lucide-react';
import styles from '../AdminUI.module.css';

export default function AdminAbout() {
  const [data, setData] = useState({
    hero: { label: '', title: '' },
    mission: { label: '', paragraphs: [] },
    values: [],
    team: [],
    testimonial: { quote: '', authorName: '', authorRole: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/about')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpdateData('about', data);
      setToast({ message: 'About page updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div>
      <PageHeader title="Edit About Page" onSave={handleSave} saving={saving} />

      <div className={styles.gridFull}>
        <Card>
          <CardHeader icon={<User size={20} />}>Hero Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Hero Label">
              <Input value={data.hero?.label || ''} onChange={e => setData({...data, hero: {...data.hero, label: e.target.value}})} placeholder="e.g. WHO WE ARE" />
            </InputGroup>
            <InputGroup label="Hero Title">
              <Input value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} placeholder="Title text" />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <CardHeader icon={<Target size={20} />}>Mission Statement</CardHeader>
          <InputGroup label="Mission Label">
            <Input value={data.mission?.label || ''} onChange={e => setData({...data, mission: {...data.mission, label: e.target.value}})} placeholder="e.g. OUR MISSION" />
          </InputGroup>
          <div style={{ marginTop: '20px' }}>
            <StringArrayEditor 
              label="Mission Paragraphs"
              items={data.mission?.paragraphs || []}
              onChange={newArr => setData({...data, mission: {...data.mission, paragraphs: newArr}})}
              placeholder="Add a paragraph..."
            />
          </div>
        </Card>

        <Card>
          <CardHeader icon={<Award size={20} />}>Testimonial</CardHeader>
          <InputGroup label="Quote">
            <Input value={data.testimonial?.quote || ''} onChange={e => setData({...data, testimonial: {...data.testimonial, quote: e.target.value}})} />
          </InputGroup>
          <div className={styles.grid}>
            <InputGroup label="Author Name">
              <Input value={data.testimonial?.authorName || ''} onChange={e => setData({...data, testimonial: {...data.testimonial, authorName: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Author Role">
              <Input value={data.testimonial?.authorRole || ''} onChange={e => setData({...data, testimonial: {...data.testimonial, authorRole: e.target.value}})} />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <CardHeader icon={<Users size={20} />}>Team Members</CardHeader>
          <ArrayBuilder
            items={data.team || []}
            onChange={newArr => setData({...data, team: newArr})}
            newItemTemplate={() => ({ name: '', role: '', gradient: '#333333' })}
            renderItem={(item, updateItem) => (
              <div className={styles.grid}>
                <InputGroup label="Name">
                  <Input value={item.name || ''} onChange={e => updateItem({...item, name: e.target.value})} />
                </InputGroup>
                <InputGroup label="Role">
                  <Input value={item.role || ''} onChange={e => updateItem({...item, role: e.target.value})} />
                </InputGroup>
                <InputGroup label="Gradient Color">
                  <Input type="color" value={item.gradient || '#333333'} onChange={e => updateItem({...item, gradient: e.target.value})} style={{ padding: 0, height: '40px', cursor: 'pointer' }} />
                </InputGroup>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardHeader icon={<Award size={20} />}>Core Values</CardHeader>
          <ArrayBuilder
            items={data.values || []}
            onChange={newArr => setData({...data, values: newArr})}
            newItemTemplate={() => ({ title: '', description: '', icon: '' })}
            renderItem={(item, updateItem) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className={styles.grid}>
                  <InputGroup label="Title">
                    <Input value={item.title || ''} onChange={e => updateItem({...item, title: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Icon (lucide name or emoji)">
                    <Input value={item.icon || ''} onChange={e => updateItem({...item, icon: e.target.value})} placeholder="e.g. Star" />
                  </InputGroup>
                </div>
                <InputGroup label="Description">
                  <Input value={item.description || ''} onChange={e => updateItem({...item, description: e.target.value})} />
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
