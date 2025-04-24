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

export interface RelatedPostType {
  id: string
  image: string;
  title: string;
  price: string;
  location: string;
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
  location: string;
  created_at: string;
  updated_at: string;
  favorited: boolean;
}

export type PostDetalsType = {
  id: number;
  title: string;
  images: string[];
  price: string;
  location: string;
  status: string;
  mileage: string;
  year: string;
  origin: string;
  fuel: string;
  transmission: string;
  seats: string;
  description: string;
  favorited: boolean;
}

export type CommentPayload = {
  comment: {
    content: string
  }
}

interface UserComment {
  id: number | string;
  email: string;
  name: string;
}

export interface CommentType {
  id: number | string;
  content: string;
  created_at: string; 
  updated_at: string; 
  user: UserComment;
}
