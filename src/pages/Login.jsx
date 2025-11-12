import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || '登录失败，请检查邮箱和密码');
    } finally {
      setLoading(false);
    }
  };

  // 快速登录（用于演示）
  const quickLogin = async (email, password) => {
    setFormData({ email, password });
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('登录失败');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">登录 SkillLink</h1>
          <p className="auth-subtitle">欢迎回来！开始你的技能之旅</p>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>邮箱</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>密码</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="输入密码"
                required
                className="form-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="auth-divider">
            <span>快速登录（演示）</span>
          </div>

          <div className="quick-login-buttons">
            <button
              onClick={() => quickLogin('zhang@example.com', 'password123')}
              className="btn-quick"
            >
              张教练（服务者）
            </button>
            <button
              onClick={() => quickLogin('user@example.com', 'password123')}
              className="btn-quick"
            >
              普通用户
            </button>
          </div>

          <div className="auth-footer">
            还没有账号？
            <Link to="/register" className="auth-link">
              立即注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

