const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export async function getHomeData() {
  return fetchData('/home');
}

export async function getAboutData() {
  return fetchData('/about');
}

export async function getInfluencersData() {
  return fetchData('/influencers');
}

export async function getServicesData() {
  return fetchData('/services');
}

export async function getWorkData() {
  return fetchData('/work');
}

export async function getWorkDetail(slug) {
  return fetchData(`/work/${slug}`);
}

export async function submitFeedback(body) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}
