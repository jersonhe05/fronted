import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import Layout from './components/Layout';
import { UserProvider } from './contexts/UserContext';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsAuthenticated(true);
      setUserRole(userData.role);
    }
  }, []);

  const handleLogin = (userData: { email: string; role: string }) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUserRole(userData.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <UserProvider value={{ isAuthenticated, userRole, handleLogin, handleLogout }}>
      <Router>
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to={userRole === 'teacher' ? '/teacher' : '/student'} />} />
          
          <Route path="/teacher/*" element={
            isAuthenticated && userRole === 'teacher' ? 
              <Layout>
                <TeacherDashboard />
              </Layout> : 
              <Navigate to="/" />
          } />
          
          <Route path="/student/*" element={
            isAuthenticated && userRole === 'student' ? 
              <Layout>
                <StudentDashboard />
              </Layout> : 
              <Navigate to="/" />
          } />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;