import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Header.css';

function Header() {
  const { user, logout, isProvider } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">SkillLink</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">首页</Link>
          <Link to="/skills" className="nav-link">技能广场</Link>
          
          {user ? (
            <>
              <Link to="/orders" className="nav-link">我的订单</Link>
              {isProvider && (
                <>
                  <Link to="/my-skills" className="nav-link">我的技能</Link>
                  <Link to="/create-skill" className="nav-link btn-primary-sm">发布技能</Link>
                </>
              )}
              <div className="user-menu">
                <button className="user-button">
                  <img 
                    src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
                    alt={user.username}
                    className="user-avatar"
                  />
                  <span>{user.username}</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">个人中心</Link>
                  <button onClick={handleLogout} className="dropdown-item">退出登录</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">登录</Link>
              <Link to="/register" className="nav-link btn-primary-sm">注册</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

