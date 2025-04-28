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

export interface PredictionResponseBody {
  car_name: string;
  year_of_manufacture: number;
  mileage: number;
  predicted_price: string;
}

export interface PredictionResponse {
  status: number;
  body: PredictionResponseBody;
}
export interface AuthHeaders {
  "access-token": string;
  uid: string;
  client: string;
  [key: string]: string; 
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  role?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
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

export interface SearchParams {
  query?: string;
  brand_id?: number | string;
  model_id?: number | string;
  version_id?: number | string;
  year?: number | string;
  odo_min?: number | string | null;
  odo_max?: number | string | null;
  price_min?: number | string | null;
  price_max?: number | string | null;
  sort?: string | null;
  page?: number | string;
}

interface ReportData {
  reason: string;
  reportable_type: 'User' | 'SalePost'; 
  reportable_id: number;
  images: (string | null)[]; 
}

export interface ReportPayload {
  report: ReportData;
}
