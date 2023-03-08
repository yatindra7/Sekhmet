import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../data';
import { handleAxiosError } from '../helpers';
import { User } from '../types';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | undefined;
  loginHandler: (authToken: string) => void;
  logoutHandler: () => void;
};

const AuthContext = createContext<AuthContextType>(undefined!);
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authorizationtoken') !== null);
  const [user, setUser] = useState<User>();

  const loginHandler = (authToken: string) => {
    localStorage.setItem('authorizationtoken', authToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    setIsAuthenticated(true);
    axios
      .get(`${BACKEND_URL}/token_user`)
      .then((response) => setUser(response.data))
      .catch((error) => handleAxiosError(error));
    navigate('/');
  };

  const logoutHandler = () => {
    localStorage.removeItem('authorizationtoken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(undefined);
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authorizationtoken');
    if (authToken !== null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      axios
        .get(`${BACKEND_URL}/token_user`)
        .then((response) => setUser(response.data))
        .catch((error) => {
          handleAxiosError(error);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const value = useMemo(() => ({ isAuthenticated, user, loginHandler, logoutHandler }), [isAuthenticated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
