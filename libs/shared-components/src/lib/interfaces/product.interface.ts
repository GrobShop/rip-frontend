export interface Product {
  id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  price: number;
  images: string[];
  category_id?: string;
  stock?: number;
}

export interface ProductServer{
  id: string;
  name: string;
  category_id: string;
  price: number;
  stock: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  description: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}
