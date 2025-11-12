import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn } from "@stackframe/stack";
import { useUser } from "@stackframe/stack";
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    // 如果已登录，重定向到首页
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">登录 SkillLink</h1>
          <p className="auth-subtitle">欢迎回来！开始你的技能之旅</p>
          
          <div className="stack-auth-wrapper">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

