import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration - Updated to use your computer's IP address
const BASE_URL = 'http://192.168.1.101:3000/api';
export const STATIC_URL = 'http://192.168.1.101:3000';

// Types
export interface Property {
  id: number;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  content?: string;
  images: Array<{ baseUrl: string }>;
  category?: { name: string };
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
}

export interface SearchFilters {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  type?: string;
  city?: string;
  state?: string;
  }

// Auth helpers
const TOKEN_KEY = 'rentahouse_token';

const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Generic API fetch function
const apiFetch = async (endpoint: string, options: {
  method?: string;
  body?: any;
  token?: string | null;
} = {}) => {
  const { method = 'GET', body } = options;
  let { token } = options;
  
  // If no token provided, try to get it from storage
  if (token === undefined) {
    token = await getToken();
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'API Error');
  }

  return response.json();
};

// Auth API
export const loginApi = async (email: string, password: string) => {
  const result = await apiFetch('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  
  if (result.token) {
    await setToken(result.token);
  }
  
  return result;
};

export const signupApi = async (fullName: string, email: string, password: string, phone?: string) => {
  const result = await apiFetch('/auth/register', {
    method: 'POST',
    body: { fullName, email, password, phone },
  });
  
  if (result.token) {
    await setToken(result.token);
  }
  
  return result;
};

export const getMeApi = async (): Promise<User> => {
  return apiFetch('/auth/me');
};

export const logout = async () => {
  await removeToken();
};

// Posts API
export const getAllPosts = async (filters: SearchFilters = {}): Promise<Property[]> => {
  const query = new URLSearchParams(filters as Record<string, string>).toString();
  return apiFetch(`/posts?${query}`);
};

export const getPostById = async (id: number | string): Promise<Property> => {
  return apiFetch(`/posts/${id}`);
};

export const searchProperties = async (filters: SearchFilters = {}): Promise<Property[]> => {
  return getAllPosts(filters);
};

export const createPost = async (formData: FormData) => {
  const token = await getToken();
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'API Error');
  }

  return response.json();
};

export const updatePost = async (id: number, body: any) => {
  return apiFetch(`/posts/${id}`, {
    method: 'PUT',
    body,
  });
};

export const deletePost = async (id: number) => {
  return apiFetch(`/posts/${id}`, {
    method: 'DELETE',
  });
};

// Comments API (for future use)
export const getCommentsByPostId = async (postId: number) => {
  return apiFetch(`/comments?postId=${postId}`);
};

export const createComment = async (postId: number, content: string) => {
  return apiFetch('/comments', {
    method: 'POST',
    body: { postId, content },
  });
}; 