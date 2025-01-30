import axios from "axios";
import { LoginCredentials, UserFormData } from "../types/type";

const API_BASE_URL = "https://reqres.in/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/login", credentials);
  return response.data.token;
};

export const getUsers = async (page: number) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (user: UserFormData) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const updateUser = async (id: number, user: UserFormData) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};
