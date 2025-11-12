import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillAPI } from '../api';
import { useAuth } from '../AuthContext';
import './MySkills.css';

function MySkills() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMySkills();
  }, []);

  const loadMySkills = async () => {
    setLoading(true);
    try {
      const data = await skillAPI.getSkills({});
      // 筛选当前用户的技能
      const mySkills = data.items.filter(skill => skill.provider_id === user.id);
      setSkills(mySkills);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryNames = {
    sports: '运动',
    music: '音乐',
    programming: '编程',
    language: '语言',
    volunteer: '志愿服务',
    art: '艺术',
    other: '其他'
  };

  return (
    <div className="my-skills-page">
      <div className="skills-container">
        <div className="page-header">
          <h1 className="page-title">我的技能</h1>
          <button
            className="btn-create"
            onClick={() => navigate('/create-skill')}
          >
            ➕ 发布新技能
          </button>
        </div>

        {loading ? (
          <div className="loading">加载中...</div>
        ) : skills.length === 0 ? (
          <div className="no-skills">
            <div className="no-skills-icon">📚</div>
            <p>还没有发布技能</p>
            <button
              className="btn-primary"
              onClick={() => navigate('/create-skill')}
            >
              发布第一个技能
            </button>
          </div>
        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="skill-card"
                onClick={() => navigate(`/skills/${skill.id}`)}
              >
                <div className="skill-card-header">
                  <span className="skill-category">
                    {categoryNames[skill.category]}
                  </span>
                  <span className={`skill-status ${skill.is_active ? 'active' : 'inactive'}`}>
                    {skill.is_active ? '✓ 已上架' : '× 已下架'}
                  </span>
                </div>

                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">
                  {skill.description.substring(0, 100)}...
                </p>

                <div className="skill-stats">
                  <div className="stat">
                    <span className="stat-value">{skill.views_count}</span>
                    <span className="stat-label">浏览</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{skill.orders_count}</span>
                    <span className="stat-label">订单</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">⭐ {skill.average_rating.toFixed(1)}</span>
                    <span className="stat-label">评分</span>
                  </div>
                </div>

                <div className="skill-footer">
                  <div className="skill-price">
                    ¥{skill.price_per_hour}/小时
                  </div>
                  <div className="skill-actions">
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 实现编辑功能
                        alert('编辑功能开发中');
                      }}
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MySkills;

