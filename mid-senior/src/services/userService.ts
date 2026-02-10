import type { User } from "./../types/user";
import apiClient from "../api/client";

export const UserService = {
  getAll: (): Promise<User[]> => apiClient.get("/users"),
  getById: (id: number): Promise<User> => apiClient.get(`/users/${id}`),
  create: (data: Omit<User, "id">): Promise<User> =>
    apiClient.post("/users", data),
};
