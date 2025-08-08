// types.ts (or inside your component file)

export interface Breadcrumb {
  label: string;
  path: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_name: string;
  level: number;
  breadcrumbs: Breadcrumb[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  price: number;
  main_image: string;
  is_featured: boolean;
  in_stock: boolean;
  stock_status: string;
  original_price: string;
  discounted_price: number;
}
