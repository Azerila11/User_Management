export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
}