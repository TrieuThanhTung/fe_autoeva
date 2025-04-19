 export interface CarCardProps {
  name: string;
  image: string;
  price: string;
  location: string;
  mileage: string;
}

export interface CreatePostType {
  brand_id: number,
  model_id: number,
  version_id: number,
  description: string,
  year: number,
  price: number,
  location: string,
  odo: number,
  images: []
}

export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
}

export interface Version {
  id: number;
  info: string;
}

export interface PostItemType {
  id: number;
  title: string;
  price: string;
  status: string; 
  year: number;
  odo: number;
  image: string;
  created_at: string;
  updated_at: string;
  favorited: boolean;
}
