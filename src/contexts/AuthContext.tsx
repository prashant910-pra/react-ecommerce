import { postCall } from '@/api/api';
import { API_URL } from '@/common/constant';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; user: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; user: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

const login = async (email: string, password: string): Promise<boolean> => {
  dispatch({ type: 'LOGIN_START' });

  try {
    const response = await postCall(API_URL + '/auth/login', {
      username: email,
      password: password,
    });

    if (response.status === 200) {
      const user: User = response.data;
      dispatch({ type: 'LOGIN_SUCCESS', user });
      localStorage.setItem('auth_user', JSON.stringify(user));
      console.log('Login successful====:', user);
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE' });
    console.error('Login failed:', error);
    return false;
  }
}
  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call
      await postCall(API_URL + '/api/users/register', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      
      }).then((response) => {
        if (response.status === 200) {
          const user: User = response.data;
          
          dispatch({ type: 'REGISTER_SUCCESS', user });
          localStorage.setItem('auth_user', JSON.stringify(user));
          console.log('Login successful====:', user);
          return true;
        }
      }).catch((error) => {
        console.error('Login failed:', error);
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      });

      // const user: User = {
      //   id: `user_${Date.now()}`,
      //   email,
      //   firstName,
      //   lastName,
      //   createdAt: new Date(),
      // };

      // dispatch({ type: 'REGISTER_SUCCESS', user });
      // localStorage.setItem('auth_user', JSON.stringify(user));
      // return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('auth_user');
  };

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', user });
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};