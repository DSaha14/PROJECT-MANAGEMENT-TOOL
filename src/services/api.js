import axios from 'axios';

const API = axios.create({ baseURL: 'https://project-management-tool-fej1.onrender.com' });

export const fetchProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);
export const fetchTasks = (projectId) => API.get(`/tasks/${projectId}`);
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTaskStatus = (taskId, status) => API.put(`/tasks/${taskId}`, { status });
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const updateProject = (id, updatedData) => API.put(`/projects/${id}`, updatedData);
