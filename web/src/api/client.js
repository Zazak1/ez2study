import axios from 'axios';

// 创建 axios 实例
const client = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // 确保与后端地址一致
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加 Token
client.interceptors.request.use(
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

// 响应拦截器：处理错误
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 401 未授权，清除 token 并跳转登录
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // 避免在登录页重复跳转
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default client;

// 认证 API
export const authApi = {
  login: (username, password) => {
    // OAuth2PasswordRequestForm 需要 x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    return client.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  register: (data) => client.post('/auth/register', data),
  me: () => client.get('/auth/me'),
};

