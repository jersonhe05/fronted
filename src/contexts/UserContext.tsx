import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  token: string | null;
  handleLogin: (userData: { email: string; password: string }) => Promise<void>;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token in localStorage on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      const userData = JSON.parse(storedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
      setUserRole(userData.role);
    }
  }, []);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      // This will be replaced with actual API call when backend is ready
      const response = await mockLoginAPI(credentials);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        email: credentials.email,
        role: response.role
      }));

      setToken(response.token);
      setIsAuthenticated(true);
      setUserRole(response.role);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Mock API function - replace with actual API call later
  const mockLoginAPI = async (credentials: { email: string; password: string }) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock response based on email domain
    const isTeacher = credentials.email.includes('teacher');
    return {
      token: 'mock-jwt-token-' + Math.random(),
      role: isTeacher ? 'teacher' : 'student'
    };
  };

  const value = {
    isAuthenticated,
    userRole,
    token,
    handleLogin,
    handleLogout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};