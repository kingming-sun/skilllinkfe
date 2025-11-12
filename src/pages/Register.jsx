import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from "@stackframe/stack";
import { useUser } from "@stackframe/stack";
import './Auth.css';

function Register() {
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
          <h1 className="auth-title">注册 SkillLink</h1>
          <p className="auth-subtitle">加入我们，开启技能共享之旅</p>
          
          <div className="stack-auth-wrapper">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

