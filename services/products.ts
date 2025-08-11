// src/services/productService.ts
import api from '@/lib/axios';

export const fetchProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};




export const fetchProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
};




export const fetchNewArrivals = async () => {
  const response = await api.get('/products/new-arrivals/');
  return response.data;
};


export const fetchFeaturedProducts = async () => {
  const response = await api.get('/products/featured/');
  return response.data; // array of featured products
};



export const fetchProductsByCategorySlug = async (slug: string) => {
  const response = await api.get(`/products/?category=${slug}`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await api.get(`/products/?search=${encodeURIComponent(query)}`);
  return response.data;
};
