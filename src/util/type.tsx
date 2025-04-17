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
