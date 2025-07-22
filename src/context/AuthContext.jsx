import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import App from '../App';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${API_BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (name, email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, { name, email });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      throw error.response.data.message || 'Login failed';
    }
  };

  const register = async (name, email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`, { name, email });
      setUser(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      throw error.response.data.message || 'Registration failed';
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};