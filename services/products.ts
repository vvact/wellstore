import api from '@/lib/axios';

export const fetchProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const fetchProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
};
