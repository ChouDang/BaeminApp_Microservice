'use client'
import axiosInstance from '@/apis/axiosConfig';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

type UserState = {
  user: User | null;
  isLoggedIn: boolean;
}

type UserAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

// Khởi tạo UserContext
const UserContext = createContext<{
  state: UserState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (a: any) => any;
}>({
  state: { user: null, isLoggedIn: false },
  login: async () => { },
  logout: () => { },
  signUp: () => { }
});

// Hàm reducer để quản lý trạng thái của user
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload } as User,
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null, isLoggedIn: false });
  const router = useRouter(); 
  
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch({ type: 'LOGIN', payload: response.data.user });
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials, please try again.');
    }
  };

  const signUp = async (data: any) => {
    try {
      const response = await axiosInstance.post('/auth/sign-up', data);
      return response
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid, please try again.');
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('allRestaurants');
    localStorage.removeItem('allCategory');
    localStorage.removeItem('Cart');
    dispatch({ type: 'LOGOUT' });
    router.push('/')
  };

  useEffect(() => {
    if (!state.isLoggedIn && localStorage.getItem('token')) {
      let user = localStorage.getItem('user')
      if (user) dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, [state.isLoggedIn])

  return (
    <UserContext.Provider value={{ state, login, logout, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
