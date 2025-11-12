import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { skillAPI } from '../api';
import './CreateSkill.css';

function CreateSkill() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'programming',
    price_per_hour: '',
    duration_minutes: '60',
    service_mode: 'both',
    location: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const skillData = {
        ...formData,
        price_per_hour: parseFloat(formData.price_per_hour),
        duration_minutes: parseInt(formData.duration_minutes),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      await skillAPI.createSkill(skillData);
      alert('技能发布成功！');
      navigate('/my-skills');
    } catch (err) {
      setError(err.response?.data?.detail || '发布失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'sports', label: '⚽ 运动' },
    { value: 'music', label: '🎵 音乐' },
    { value: 'programming', label: '💻 编程' },
    { value: 'language', label: '🗣️ 语言' },
    { value: 'volunteer', label: '🤝 志愿服务' },
    { value: 'art', label: '🎨 艺术' },
    { value: 'other', label: '📚 其他' }
  ];

  return (
    <div className="create-skill-page">
      <div className="create-container">
        <h1 className="page-title">发布技能</h1>
        <p className="page-subtitle">分享你的技能，帮助他人成长</p>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-section">
            <h2>基本信息</h2>
            
            <div className="form-group">
              <label>技能标题 *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="例如：网球入门课程"
                required
                maxLength={100}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>技能描述 *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="详细描述你的技能、教学内容、适合人群等..."
                required
                minLength={10}
                rows="6"
                className="form-textarea"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>技能分类 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                  required
                >
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>标签（用逗号分隔）</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="网球,零基础,运动"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>服务详情</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>价格（元/小时）*</label>
                <input
                  type="number"
                  value={formData.price_per_hour}
                  onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
                  placeholder="80"
                  required
                  min="0"
                  step="0.01"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>课程时长（分钟）*</label>
                <input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                  placeholder="60"
                  required
                  min="15"
                  step="15"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>服务模式 *</label>
              <div className="radio-group">
                <label className={`radio-option ${formData.service_mode === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="online"
                    checked={formData.service_mode === 'online'}
                    onChange={(e) => setFormData({ ...formData, service_mode: e.target.value })}
                  />
                  <div className="radio-content">
                    <div className="radio-icon">📱</div>
                    <div className="radio-label">线上</div>
                  </div>
                </label>

                <label className={`radio-option ${formData.service_mode === 'offline' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="offline"
                    checked={formData.service_mode === 'offline'}
                    onChange={(e) => setFormData({ ...formData, service_mode: e.target.value })}
                  />
                  <div className="radio-content">
                    <div className="radio-icon">📍</div>
                    <div className="radio-label">线下</div>
                  </div>
                </label>

                <label className={`radio-option ${formData.service_mode === 'both' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    value="both"
                    checked={formData.service_mode === 'both'}
                    onChange={(e) => setFormData({ ...formData, service_mode: e.target.value })}
                  />
                  <div className="radio-content">
                    <div className="radio-icon">📱📍</div>
                    <div className="radio-label">两者皆可</div>
                  </div>
                </label>
              </div>
            </div>

            {(formData.service_mode === 'offline' || formData.service_mode === 'both') && (
              <div className="form-group">
                <label>服务地点</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="例如：清华大学体育馆"
                  className="form-input"
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/my-skills')}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? '发布中...' : '发布技能'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSkill;

