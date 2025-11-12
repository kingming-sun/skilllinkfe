import { useAuth } from '../AuthContext';
import './Profile.css';

function Profile() {
  const { user, isProvider } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={user.username}
              className="profile-avatar"
            />
            <div className="profile-info">
              <h1>{user.username}</h1>
              <p className="profile-email">{user.email}</p>
              <div className="profile-badges">
                {isProvider && (
                  <span className="badge badge-provider">🎓 服务提供者</span>
                )}
                {user.is_verified && (
                  <span className="badge badge-verified">✓ 已认证</span>
                )}
                {user.is_student && (
                  <span className="badge badge-student">🎒 大学生</span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-body">
            <div className="info-section">
              <h2>个人信息</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">用户名</span>
                  <span className="info-value">{user.username}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">邮箱</span>
                  <span className="info-value">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="info-item">
                    <span className="info-label">手机号</span>
                    <span className="info-value">{user.phone}</span>
                  </div>
                )}
                {user.university && (
                  <div className="info-item">
                    <span className="info-label">学校</span>
                    <span className="info-value">{user.university}</span>
                  </div>
                )}
                {user.major && (
                  <div className="info-item">
                    <span className="info-label">专业</span>
                    <span className="info-value">{user.major}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">注册时间</span>
                  <span className="info-value">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>账户设置</h2>
              <div className="settings-list">
                <button className="setting-item" disabled>
                  <span>🔐 修改密码</span>
                  <span className="setting-arrow">→</span>
                </button>
                <button className="setting-item" disabled>
                  <span>👤 编辑资料</span>
                  <span className="setting-arrow">→</span>
                </button>
                <button className="setting-item" disabled>
                  <span>🔔 通知设置</span>
                  <span className="setting-arrow">→</span>
                </button>
              </div>
              <p className="settings-note">
                💡 以上功能开发中，敬请期待
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

