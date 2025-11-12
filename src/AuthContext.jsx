import { createContext, useContext, useState, useEffect } from 'react';
import { useStackApp, useUser } from "@stackframe/stack";
import { authAPI } from './api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const stackApp = useStackApp();
  const stackUser = useUser();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 当 Stack Auth 用户改变时，同步到后端
    const syncUser = async () => {
      if (stackUser) {
        try {
          // 从后端获取用户完整信息
          const profile = await authAPI.getProfile();
          setUser(profile);
        } catch (error) {
          console.error('获取用户信息失败:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    syncUser();
  }, [stackUser]);

  const login = () => {
    // 使用 Stack Auth 登录页面
    stackApp.redirectToSignIn();
  };

  const register = () => {
    // 使用 Stack Auth 注册页面
    stackApp.redirectToSignUp();
  };

  const logout = async () => {
    await stackApp.signOut();
    setUser(null);
  };

  const isProvider = user?.role === 'provider' || user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isProvider,
      stackUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

