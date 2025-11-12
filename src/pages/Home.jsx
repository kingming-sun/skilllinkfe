import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillAPI, statsAPI } from '../api';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [featuredSkills, setFeaturedSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // 加载推荐技能
      const skillsData = await skillAPI.getSkills({ page: 1, page_size: 6 });
      setFeaturedSkills(skillsData.items);

      // 加载分类统计
      const categoriesData = await statsAPI.getCategories();
      setCategories(categoriesData.categories);

      // 加载统计数据
      const statsData = await statsAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/skills?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const categoryIcons = {
    sports: '⚽',
    music: '🎵',
    programming: '💻',
    language: '🗣️',
    volunteer: '🤝',
    art: '🎨',
    other: '📚'
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            让技能更灵活<br />让时间更有价值
          </h1>
          <p className="hero-subtitle">
            短期技能学习 · 大学生技能共享 · 灵活预约服务
          </p>
          
          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="搜索你想学的技能... 例如：网球、Python、钢琴"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍 搜索
            </button>
          </form>

          {stats && (
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.total_skills}+</span>
                <span className="stat-label">技能</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.active_providers}+</span>
                <span className="stat-label">服务者</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.total_orders}+</span>
                <span className="stat-label">订单</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">热门分类</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="category-card"
                onClick={() => navigate(`/skills?category=${cat.label}`)}
              >
                <div className="category-icon">
                  {categoryIcons[cat.label] || '📚'}
                </div>
                <div className="category-name">
                  {categoryNames[cat.label] || cat.label}
                </div>
                <div className="category-count">{cat.count} 个技能</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">推荐技能</h2>
          <div className="skills-grid">
            {featuredSkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-card"
                onClick={() => navigate(`/skills/${skill.id}`)}
              >
                <div className="skill-card-header">
                  <span className="skill-category">
                    {categoryIcons[skill.category]} {categoryNames[skill.category]}
                  </span>
                  <span className="skill-rating">
                    ⭐ {skill.average_rating.toFixed(1)}
                  </span>
                </div>
                
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">
                  {skill.description.substring(0, 80)}...
                </p>
                
                <div className="skill-provider">
                  <img
                    src={skill.provider_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt={skill.provider_name}
                    className="provider-avatar-sm"
                  />
                  <div className="provider-info">
                    <div className="provider-name">{skill.provider_name}</div>
                    {skill.provider_university && (
                      <div className="provider-university">
                        {skill.provider_university}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="skill-footer">
                  <div className="skill-price">
                    ¥{skill.price_per_hour}/小时
                  </div>
                  <div className="skill-mode">
                    {skill.service_mode === 'online' ? '📱 线上' : 
                     skill.service_mode === 'offline' ? '📍 线下' : '📱📍 两者皆可'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-more">
            <button 
              className="btn-secondary"
              onClick={() => navigate('/skills')}
            >
              查看更多技能 →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">如何使用</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3>搜索技能</h3>
              <p>浏览或搜索你想学习的技能</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">📅</div>
              <h3>预约时间</h3>
              <p>选择合适的时间进行预约</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">💳</div>
              <h3>安全支付</h3>
              <p>平台托管资金，安全有保障</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">🎓</div>
              <h3>开始学习</h3>
              <p>与服务者联系，开始学习</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>准备好开始了吗？</h2>
          <p>加入 SkillLink，让时间和技能更有价值</p>
          <div className="cta-buttons">
            <button 
              className="btn-primary-large"
              onClick={() => navigate('/skills')}
            >
              探索技能
            </button>
            <button 
              className="btn-secondary-large"
              onClick={() => navigate('/register')}
            >
              成为服务者
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

