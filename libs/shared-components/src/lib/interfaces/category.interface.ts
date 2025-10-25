export interface Category {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export interface CategoryServer{
  id: string;
  creator_id: string;
  creator_type: string;
  name: string;
  description: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}
