// import { User } from "./../types/user";
// import { UserService } from "./userService";
import apiClient from "../api/client";
import type {
  User,
  UserResponse,
  CreateUserData,
  UpdateUserData,
} from "../types/user";
interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}
// export const UserService = {
//   getAll: (): Promise<User[]> => apiClient.get("/users"),
//   getById: (id: number): Promise<User> => apiClient.get(`/users/${id}`),
//   create: (data: Omit<User, "id">): Promise<User> =>
//     apiClient.post("/users", data),
// };

export const UserService = {
  getAll: (params: GetUsersParams = {}): Promise<UserResponse> => {
    return apiClient.get("/users", { params });
  },

  getById: (id: number): Promise<User> => {
    return apiClient.get(`/users/${id}`);
  },

  create: (data: CreateUserData): Promise<User> => {
    return apiClient.post("/users", data);
  },

  put: (id: number, data: UpdateUserData): Promise<User> => {
    return apiClient.put(`users/${id}`, data);
  },

  delete: (id: number): Promise<{ message: string; deleteId: number }> => {
    return apiClient.delete(`/users${id}`);
  },
};
