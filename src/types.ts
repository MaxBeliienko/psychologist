export interface UserBasicInfo {
  displayName: string | null;
  email: string | null;
}

export interface Psychologist {
  name: string;
  avatar_url: string;
  experience: string;
  reviews: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  price_per_hour: number;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
  id: string;
}
