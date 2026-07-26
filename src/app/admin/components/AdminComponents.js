'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../AdminUI.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ArrowUp, ArrowDown, Upload, Link as LinkIcon } from 'lucide-react';
import { adminUploadMedia } from '@/lib/adminApi';

export const Card = ({ children, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`${styles.card} ${className}`}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children, icon }) => (
  <div className={styles.cardHeader}>
    {icon}
    {children}
  </div>
);

export const InputGroup = ({ label, children }) => (
  <div className={styles.inputGroup}>
    {label && <label className={styles.label}>{label}</label>}
    {children}
  </div>
);

export const Input = ({ ...props }) => (
  <input className={styles.input} {...props} />
);

export const Textarea = ({ ...props }) => (
  <textarea className={`${styles.input} ${styles.textarea}`} {...props} />
);

export const Button = ({ children, variant = 'primary', icon, loading, ...props }) => {
  const vClass = variant === 'primary' ? styles.buttonPrimary : 
                 variant === 'secondary' ? styles.buttonSecondary : 
                 styles.buttonDanger;
  return (
    <button type="button" className={`${styles.button} ${vClass}`} disabled={loading} {...props}>
      {loading ? (
        <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="10" opacity="0.25"/>
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
        </svg>
      ) : icon}
      {children}
    </button>
  );
};

export const PageHeader = ({ title, onSave, saving }) => (
  <div className={styles.pageHeader}>
    <h1 className={styles.pageTitle}>{title}</h1>
    <Button onClick={onSave} loading={saving}>Save Changes</Button>
  </div>
);

export const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={styles.toast} style={{ borderLeft: `4px solid ${type === 'success' ? '#4ade80' : '#ff4444'}` }}>
      {message}
    </div>
  );
};

export const StringArrayEditor = ({ items = [], onChange, label, placeholder = 'Add item...' }) => {
  const [newItem, setNewItem] = useState('');

  const add = () => {
    if (!newItem.trim()) return;
    onChange([...items, newItem.trim()]);
    setNewItem('');
  };

  const remove = (index) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const move = (index, dir) => {
    if (index + dir < 0 || index + dir >= items.length) return;
    const next = [...items];
    const temp = next[index];
    next[index] = next[index + dir];
    next[index + dir] = temp;
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {label && <label className={styles.label}>{label}</label>}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Input 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder}
        />
        <Button variant="secondary" onClick={add}><Plus size={20}/></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div 
              key={`${item}-${i}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ flex: 1, color: '#ddd' }}>{item}</div>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', color: i === 0 ? '#444' : '#888', cursor: i === 0 ? 'not-allowed' : 'pointer' }}><ArrowUp size={16}/></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} style={{ background: 'none', border: 'none', color: i === items.length - 1 ? '#444' : '#888', cursor: i === items.length - 1 ? 'not-allowed' : 'pointer' }}><ArrowDown size={16}/></button>
              <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', marginLeft: '5px' }}><X size={16}/></button>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && <div style={{ color: '#666', fontSize: '0.9rem', fontStyle: 'italic' }}>No items added yet.</div>}
      </div>
    </div>
  );
};

export const MediaUploader = ({ value, onChange, label, accept = "image/*,video/*", placeholder = "Enter URL or Upload File" }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await adminUploadMedia(file);
      onChange(url);
    } catch (err) {
      alert("Failed to upload: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <InputGroup label={label}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
            <LinkIcon size={16} />
          </div>
          <input 
            className={styles.input}
            style={{ paddingLeft: '36px' }}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={uploading}
          />
        </div>
        <Button 
          variant="secondary" 
          onClick={() => fileInputRef.current?.click()}
          loading={uploading}
        >
          <Upload size={18} /> {uploading ? 'Processing...' : 'Upload'}
        </Button>
        <input 
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
    </InputGroup>
  );
};

export const ArrayBuilder = ({ items = [], onChange, renderItem, newItemTemplate, label }) => {
  const add = () => {
    onChange([...items, newItemTemplate()]);
  };

  const remove = (index) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const move = (index, dir) => {
    if (index + dir < 0 || index + dir >= items.length) return;
    const next = [...items];
    const temp = next[index];
    next[index] = next[index + dir];
    next[index + dir] = temp;
    onChange(next);
  };

  const updateItem = (index, newValue) => {
    const next = [...items];
    next[index] = newValue;
    onChange(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label className={styles.label} style={{ margin: 0 }}>{label}</label>
        <Button variant="secondary" onClick={add} style={{ padding: '6px 12px', fontSize: '0.85rem' }}><Plus size={16}/> Add New</Button>
      </div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div 
              key={i} // simple index key is acceptable for reorderable complex arrays without unique ids
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '5px' }}>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: i === 0 ? '#444' : '#fff', cursor: i === 0 ? 'not-allowed' : 'pointer', padding: '5px', borderRadius: '4px' }}><ArrowUp size={16}/></button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: i === items.length - 1 ? '#444' : '#fff', cursor: i === items.length - 1 ? 'not-allowed' : 'pointer', padding: '5px', borderRadius: '4px' }}><ArrowDown size={16}/></button>
                <button type="button" onClick={() => remove(i)} style={{ background: 'rgba(255,50,50,0.2)', border: 'none', color: '#ff5555', cursor: 'pointer', padding: '5px', borderRadius: '4px', marginLeft: '5px' }}><X size={16}/></button>
              </div>
              <div style={{ paddingRight: '100px' }}>
                {renderItem(item, (newVal) => updateItem(i, newVal))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && <div style={{ color: '#666', fontSize: '0.9rem', fontStyle: 'italic', padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>Empty list. Click "Add New" to begin.</div>}
        {!label && <Button variant="secondary" onClick={add} style={{ alignSelf: 'flex-start' }}><Plus size={16}/> Add Item</Button>}
      </div>
    </div>
  );
};
