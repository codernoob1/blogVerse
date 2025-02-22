import { createContext, useState, useEffect } from 'react';
import { signup, signin, logout, getCurrentUser } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.log('No authenticated user found:', error);
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  const signupUser = async (credentials) => {
    try {
      const data = await signup(credentials);
      if (data.success) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const signinUser = async (credentials) => {
    try {
      const data = await signin(credentials);
      if (data.success) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    loading,
    signupUser,
    signinUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export { AuthContext };
