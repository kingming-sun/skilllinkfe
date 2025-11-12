import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import SkillList from './pages/SkillList';
import SkillDetail from './pages/SkillDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import MySkills from './pages/MySkills';
import CreateSkill from './pages/CreateSkill';
import Profile from './pages/Profile';
import './App.css';

// 需要登录的路由保护
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">加载中...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

// 服务提供者路由保护
const ProviderRoute = ({ children }) => {
  const { user, isProvider, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-screen">加载中...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return isProvider ? children : <Navigate to="/" />;
};

function AppContent() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillList />} />
          <Route path="/skills/:id" element={<SkillDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 需要登录的路由 */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          {/* 服务提供者路由 */}
          <Route
            path="/my-skills"
            element={
              <ProviderRoute>
                <MySkills />
              </ProviderRoute>
            }
          />
          <Route
            path="/create-skill"
            element={
              <ProviderRoute>
                <CreateSkill />
              </ProviderRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
