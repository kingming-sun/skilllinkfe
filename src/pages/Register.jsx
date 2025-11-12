import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少6位');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">注册 SkillLink</h1>
          <p className="auth-subtitle">加入我们，开启技能共享之旅</p>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>用户名</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="输入用户名"
                required
                className="form-input"
              />
            </div>

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
              <label>手机号（选填）</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="138xxxx8888"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>密码</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="至少6位"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>确认密码</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="再次输入密码"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>注册身份</label>
              <div className="role-selector">
                <label className={`role-option ${formData.role === 'user' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <div className="role-content">
                    <div className="role-icon">👤</div>
                    <div className="role-name">普通用户</div>
                    <div className="role-desc">寻找技能服务</div>
                  </div>
                </label>

                <label className={`role-option ${formData.role === 'provider' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="provider"
                    checked={formData.role === 'provider'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                  <div className="role-content">
                    <div className="role-icon">🎓</div>
                    <div className="role-name">服务提供者</div>
                    <div className="role-desc">分享你的技能</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <div className="auth-footer">
            已有账号？
            <Link to="/login" className="auth-link">
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

