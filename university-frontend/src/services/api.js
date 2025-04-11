import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Update with your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
  getProfile: () => api.get('/profile'),
  refreshToken: (refreshToken) => api.post('/login/refresh', { refresh: refreshToken }),
};

// Management services
export const managementService = {
  getAll: () => api.get('/api/management/'),
  getById: (id) => api.get(`/api/management/${id}/`),
  create: (data) => api.post('/api/management/', data),
  update: (id, data) => api.put(`/api/management/${id}/`, data),
  delete: (id) => api.delete(`/api/management/${id}/`),
};

// Professor services
export const professorService = {
  getAll: () => api.get('/api/professors/'),
  getById: (id) => api.get(`/api/professors/${id}/`),
  create: (data) => api.post('/api/professors/', data),
  update: (id, data) => api.put(`/api/professors/${id}/`, data),
  delete: (id) => api.delete(`/api/professors/${id}/`),
};

// Department services
export const departmentService = {
  getAll: () => api.get('/api/departments/'),
  getById: (id) => api.get(`/api/departments/${id}/`),
  create: (data) => api.post('/api/departments/', data),
  update: (id, data) => api.put(`/api/departments/${id}/`, data),
  delete: (id) => api.delete(`/api/departments/${id}/`),
};

// Program services
export const programService = {
  getAll: () => api.get('/api/programs/'),
  getById: (id) => api.get(`/api/programs/${id}/`),
  create: (data) => api.post('/api/programs/', data),
  update: (id, data) => api.put(`/api/programs/${id}/`, data),
  delete: (id) => api.delete(`/api/programs/${id}/`),
};

// Student services
export const studentService = {
  getAll: () => api.get('/api/students/'),
  getById: (id) => api.get(`/api/students/${id}/`),
  create: (data) => api.post('/api/students/', data),
  update: (id, data) => api.put(`/api/students/${id}/`, data),
  delete: (id) => api.delete(`/api/students/${id}/`),
};

// Hostel services
export const hostelService = {
  getAll: () => api.get('/api/hostels/'),
  getById: (id) => api.get(`/api/hostels/${id}/`),
  create: (data) => api.post('/api/hostels/', data),
  update: (id, data) => api.put(`/api/hostels/${id}/`, data),
  delete: (id) => api.delete(`/api/hostels/${id}/`),
};

// Library services
export const libraryService = {
  getAll: () => api.get('/api/libraries/'),
  getById: (id) => api.get(`/api/libraries/${id}/`),
  create: (data) => api.post('/api/libraries/', data),
  update: (id, data) => api.put(`/api/libraries/${id}/`, data),
  delete: (id) => api.delete(`/api/libraries/${id}/`),
};

// Books services
export const booksService = {
  getAll: () => api.get('/api/books/'),
  getById: (id) => api.get(`/api/books/${id}/`),
  create: (data) => api.post('/api/books/', data),
  update: (id, data) => api.put(`/api/books/${id}/`, data),
  delete: (id) => api.delete(`/api/books/${id}/`),
};

// Sports services
export const sportsService = {
  getAll: () => api.get('/api/sports/'),
  getById: (id) => api.get(`/api/sports/${id}/`),
  create: (data) => api.post('/api/sports/', data),
  update: (id, data) => api.put(`/api/sports/${id}/`, data),
  delete: (id) => api.delete(`/api/sports/${id}/`),
};

// Training & Placement services
export const trainingPlacementService = {
  getAll: () => api.get('/api/training-placement-cells/'),
  getById: (id) => api.get(`/api/training-placement-cells/${id}/`),
  create: (data) => api.post('/api/training-placement-cells/', data),
  update: (id, data) => api.put(`/api/training-placement-cells/${id}/`, data),
  delete: (id) => api.delete(`/api/training-placement-cells/${id}/`),
};

// Companies services
export const companiesService = {
  getAll: () => api.get('/api/companies/'),
  getById: (id) => api.get(`/api/companies/${id}/`),
  create: (data) => api.post('/api/companies/', data),
  update: (id, data) => api.put(`/api/companies/${id}/`, data),
  delete: (id) => api.delete(`/api/companies/${id}/`),
};

// Job Offers services
export const jobOffersService = {
  getAll: () => api.get('/api/job-offers/'),
  getById: (id) => api.get(`/api/job-offers/${id}/`),
  create: (data) => api.post('/api/job-offers/', data),
  update: (id, data) => api.put(`/api/job-offers/${id}/`, data),
  delete: (id) => api.delete(`/api/job-offers/${id}/`),
};

// Internships services
export const internshipsService = {
  getAll: () => api.get('/api/internships/'),
  getById: (id) => api.get(`/api/internships/${id}/`),
  create: (data) => api.post('/api/internships/', data),
  update: (id, data) => api.put(`/api/internships/${id}/`, data),
  delete: (id) => api.delete(`/api/internships/${id}/`),
};

// Training Programs services
export const trainingProgramsService = {
  getAll: () => api.get('/api/training-programs/'),
  getById: (id) => api.get(`/api/training-programs/${id}/`),
  create: (data) => api.post('/api/training-programs/', data),
  update: (id, data) => api.put(`/api/training-programs/${id}/`, data),
  delete: (id) => api.delete(`/api/training-programs/${id}/`),
};

export default api; 