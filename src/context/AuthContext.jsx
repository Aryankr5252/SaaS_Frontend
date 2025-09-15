

import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setUser(res.data);
      } catch {
        setUser(null);
      }
      setLoading(false);
    };
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Login function
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
  };

  

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};