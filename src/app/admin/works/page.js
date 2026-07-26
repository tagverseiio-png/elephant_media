'use client';
import { useState, useEffect } from 'react';
import { adminUpdateData } from '@/lib/adminApi';
import { PageHeader, Card, CardHeader, InputGroup, Input, Toast, ArrayBuilder, StringArrayEditor } from '../components/AdminComponents';
import { Briefcase, FolderOpen, List } from 'lucide-react';
import styles from '../AdminUI.module.css';

export default function AdminWorks() {
  const [data, setData] = useState({
    hero: { title: '', subtitle: '' },
    categories: [],
    offerSection: { title: '', btnText: '', btnLink: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/work')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminUpdateData('work', data);
      setToast({ message: 'Works page updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div>
      <PageHeader title="Edit Works Overview" onSave={handleSave} saving={saving} />

      <div className={styles.gridFull}>
        <Card>
          <CardHeader icon={<Briefcase size={20} />}>Hero Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Title">
              <Input value={data.hero?.title || ''} onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Subtitle">
              <Input value={data.hero?.subtitle || ''} onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} />
            </InputGroup>
          </div>
        </Card>

        <Card>
          <CardHeader icon={<FolderOpen size={20} />}>Works Categories (Cards)</CardHeader>
          <ArrayBuilder
            items={data.categories || []}
            onChange={newArr => setData({...data, categories: newArr})}
            newItemTemplate={() => ({ category: '', mainBrand: '', hasIcon: false, slug: '', otherBrands: [], color: '#000000', imageUrl: '' })}
            renderItem={(category, updateCategory) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className={styles.grid}>
                  <InputGroup label="Category Name">
                    <Input value={category.category || ''} onChange={e => updateCategory({...category, category: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Main Brand">
                    <Input value={category.mainBrand || ''} onChange={e => updateCategory({...category, mainBrand: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="URL Slug (/work/...)">
                    <Input value={category.slug || ''} onChange={e => updateCategory({...category, slug: e.target.value})} />
                  </InputGroup>
                </div>
                <div className={styles.grid}>
                  <InputGroup label="Image URL">
                    <Input value={category.imageUrl || ''} onChange={e => updateCategory({...category, imageUrl: e.target.value})} />
                  </InputGroup>
                  <InputGroup label="Color (Background)">
                    <Input type="color" value={category.color || '#000000'} onChange={e => updateCategory({...category, color: e.target.value})} style={{ padding: 0, height: '40px', cursor: 'pointer' }} />
                  </InputGroup>
                  <InputGroup label="Has Icon?">
                    <select 
                      className={styles.input} 
                      value={category.hasIcon ? 'yes' : 'no'} 
                      onChange={e => updateCategory({...category, hasIcon: e.target.value === 'yes'})}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </InputGroup>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '8px' }}>
                  <StringArrayEditor
                    label="Other Brands"
                    items={category.otherBrands || []}
                    onChange={newBrands => updateCategory({...category, otherBrands: newBrands})}
                    placeholder="Add a brand..."
                  />
                </div>
              </div>
            )}
          />
        </Card>

        <Card>
          <CardHeader icon={<List size={20} />}>Offer Section</CardHeader>
          <div className={styles.grid}>
            <InputGroup label="Offer Title">
              <Input value={data.offerSection?.title || ''} onChange={e => setData({...data, offerSection: {...data.offerSection, title: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Button Text">
              <Input value={data.offerSection?.btnText || ''} onChange={e => setData({...data, offerSection: {...data.offerSection, btnText: e.target.value}})} />
            </InputGroup>
            <InputGroup label="Button Link">
              <Input value={data.offerSection?.btnLink || ''} onChange={e => setData({...data, offerSection: {...data.offerSection, btnLink: e.target.value}})} />
            </InputGroup>
          </div>
        </Card>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
