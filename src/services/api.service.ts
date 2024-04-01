import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define a generic type for the response data

// Define API paths
export const API_PATHS = {
  // -------- USER -----------//
  updateUserAvatar: '/user/avatar',
  updateUserInfor: '/user/info',
  getUserById: '/user/:user_id',
  // -------- POSTs -----------//
  addPost: '/post'
};

// Define a generic function for making API requests
async function apiRequest<T>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient.request(config);
    return response.data;
  } catch (error) {
    // Handle errors here
    
    throw error;
  }
}

// Define the base URL for the API
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Create a custom Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL +'/api',
  timeout: 10000, // Set timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you want
  },
});

// Define the service object
const ApiService = {
  get: async <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiRequest<T>({ ...config, method: 'GET', url: path });
  },
  post: async <T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ ...config, method: 'POST', url: path, data });
  },
  put: async <T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ ...config, method: 'PUT', url: path, data });
  },
  delete: async <T>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ ...config, method: 'DELETE', url: path });
  },
};

export default ApiService;
