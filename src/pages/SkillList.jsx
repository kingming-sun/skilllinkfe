import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { skillAPI } from '../api';
import './SkillList.css';

function SkillList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    serviceMode: '',
    minRating: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    loadSkills();
  }, [filters, pagination.page]);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.page,
        page_size: pagination.pageSize
      };
      
      // 移除空值
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null) {
          delete params[key];
        }
      });

      const data = await skillAPI.getSkills(params);
      setSkills(data.items);
      setPagination(prev => ({
        ...prev,
        total: data.total,
        totalPages: data.total_pages
      }));
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      serviceMode: '',
      minRating: ''
    });
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
    <div className="skill-list-page">
      <div className="skill-list-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>筛选</h3>
            <button onClick={clearFilters} className="clear-btn">清空</button>
          </div>

          <div className="filter-group">
            <label>关键词搜索</label>
            <input
              type="text"
              placeholder="搜索技能..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>分类</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">全部分类</option>
              {Object.entries(categoryNames).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>价格范围（元/小时）</label>
            <div className="price-range">
              <input
                type="number"
                placeholder="最低"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="filter-input-sm"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="最高"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="filter-input-sm"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>服务模式</label>
            <select
              value={filters.serviceMode}
              onChange={(e) => handleFilterChange('serviceMode', e.target.value)}
              className="filter-select"
            >
              <option value="">不限</option>
              <option value="online">线上</option>
              <option value="offline">线下</option>
              <option value="both">两者皆可</option>
            </select>
          </div>

          <div className="filter-group">
            <label>最低评分</label>
            <select
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              className="filter-select"
            >
              <option value="">不限</option>
              <option value="4.5">4.5星以上</option>
              <option value="4.0">4.0星以上</option>
              <option value="3.5">3.5星以上</option>
            </select>
          </div>
        </aside>

        {/* Skills Grid */}
        <main className="skills-main">
          <div className="skills-header">
            <h2>技能列表</h2>
            <div className="results-info">
              找到 {pagination.total} 个结果
            </div>
          </div>

          {loading ? (
            <div className="loading">加载中...</div>
          ) : skills.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">😔</div>
              <p>没有找到符合条件的技能</p>
              <button onClick={clearFilters} className="btn-primary">
                清空筛选条件
              </button>
            </div>
          ) : (
            <>
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
                      <span className="skill-rating">
                        ⭐ {skill.average_rating.toFixed(1)}
                      </span>
                    </div>
                    
                    <h3 className="skill-title">{skill.title}</h3>
                    <p className="skill-description">
                      {skill.description.substring(0, 100)}...
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
                         skill.service_mode === 'offline' ? '📍 线下' : '📱📍 两者'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    上一页
                  </button>
                  
                  <div className="page-info">
                    第 {pagination.page} / {pagination.totalPages} 页
                  </div>
                  
                  <button
                    className="page-btn"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default SkillList;

