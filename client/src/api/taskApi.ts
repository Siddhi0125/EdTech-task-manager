import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// helper to attach token
const withToken = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token: string) => API.get('/tasks', withToken(token));
export const createTask = (token: string, data: any) => API.post('/tasks', data, withToken(token));
export const updateTask = (token: string, id: string, data: any) => API.put(`/tasks/${id}`, data, withToken(token));
export const deleteTask = (token: string, id: string) => API.delete(`/tasks/${id}`, withToken(token));
