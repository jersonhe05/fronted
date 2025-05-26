import React, { createContext, useContext, ReactNode } from 'react';

interface UserContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  handleLogin: (userData: { email: string; role: string }) => void;
  handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ 
  children, 
  value 
}: { 
  children: ReactNode; 
  value: UserContextType 
}) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};