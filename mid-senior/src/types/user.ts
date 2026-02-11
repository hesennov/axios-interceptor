export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  active: boolean;
}

export interface UserResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: User[];
}

export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  active?: boolean;
}

export interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  active?: boolean;
}

export interface Column<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}
