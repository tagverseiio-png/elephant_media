const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/admin';

function getAuthHeaders() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function adminVerifyToken() {
  const res = await fetch(`${API_BASE}/verify`, {
    headers: getAuthHeaders()
  });
  return res.ok;
}

export async function adminSetup(username, password) {
  const res = await fetch(`${API_BASE}/setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminUpdateData(endpoint, data) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`Failed to update ${endpoint}`);
  return res.json();
}

export async function adminUploadMedia(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload media');
  const data = await res.json();
  return data.url;
}

// Feedbacks
export async function adminGetFeedbacks() {
  const res = await fetch(`${API_BASE}/feedbacks`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch feedbacks');
  return res.json();
}

export async function adminDeleteFeedback(id) {
  const res = await fetch(`${API_BASE}/feedbacks/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to delete feedback');
  return res.json();
}
