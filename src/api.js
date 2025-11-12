import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============= 认证相关 =============

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

// ============= 技能相关 =============

export const skillAPI = {
  getSkills: (params) => api.get('/skills', { params }),
  getSkill: (id) => api.get(`/skills/${id}`),
  createSkill: (data) => api.post('/skills', data),
  getSkillReviews: (id, params) => api.get(`/skills/${id}/reviews`, { params }),
};

// ============= 订单相关 =============

export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  updateOrderStatus: (id, data) => api.patch(`/orders/${id}/status`, data),
};

// ============= 评价相关 =============

export const reviewAPI = {
  createReview: (data) => api.post('/reviews', data),
};

// ============= 统计相关 =============

export const statsAPI = {
  getStats: () => api.get('/stats'),
  getCategories: () => api.get('/categories'),
};

export default api;

