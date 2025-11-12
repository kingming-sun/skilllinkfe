import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://skilllinkbe.onrender.com/api';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加 Stack Auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // 从 Stack Auth SDK 获取 token
      const { stackApp } = await import('./stackAuthConfig');
      const user = stackApp.getUser();
      
      if (user) {
        // 获取 JWT token
        const token = await user.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('获取 token 失败:', error);
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
  async (error) => {
    if (error.response?.status === 401) {
      // 认证失败，重定向到 Stack Auth 登录页面
      const { stackApp } = await import('./stackAuthConfig');
      stackApp.redirectToSignIn();
    }
    return Promise.reject(error);
  }
);

// ============= 认证相关 =============

export const authAPI = {
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

