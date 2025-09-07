export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.insany.co/api';

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${endpoint}`);
  }

  return res.json();
}
