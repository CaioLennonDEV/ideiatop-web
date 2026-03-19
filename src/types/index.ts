export interface Product {
  uid: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  productType: ProductType;
  clientUid: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductType {
  uid: string;
  name: string;
  description?: string;
}

export interface Client {
  uid: string;
  name: string;
  email: string;
  phone?: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  active?: boolean;
  taxNumber?: string;
}

export interface AuthResponse {
  jwttoken: string;
  account: User;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
