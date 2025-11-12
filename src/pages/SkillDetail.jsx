import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { skillAPI, orderAPI } from '../api';
import { useAuth } from '../AuthContext';
import './SkillDetail.css';

function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    scheduledDate: '',
    message: ''
  });

  useEffect(() => {
    loadSkillData();
  }, [id]);

  const loadSkillData = async () => {
    setLoading(true);
    try {
      const [skillData, reviewsData] = await Promise.all([
        skillAPI.getSkill(id),
        skillAPI.getSkillReviews(id, { page: 1, page_size: 10 })
      ]);
      
      setSkill(skillData);
      setReviews(reviewsData.items);
    } catch (error) {
      console.error('Error loading skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        skill_id: parseInt(id),
        scheduled_date: new Date(bookingData.scheduledDate).toISOString(),
        message: bookingData.message
      };

      await orderAPI.createOrder(orderData);
      alert('预约成功！请在"我的订单"中查看');
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('预约失败，请重试');
    }
  };

  if (loading) {
    return <div className="loading-screen">加载中...</div>;
  }

  if (!skill) {
    return <div className="error-screen">技能不存在</div>;
  }

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
    <div className="skill-detail-page">
      <div className="skill-detail-container">
        {/* Main Content */}
        <div className="skill-main-content">
          {/* Skill Header */}
          <div className="skill-header">
            <div className="skill-category-badge">
              {categoryNames[skill.category]}
            </div>
            <h1 className="skill-title-large">{skill.title}</h1>
            
            <div className="skill-meta">
              <span className="rating-large">
                ⭐ {skill.average_rating.toFixed(1)} ({skill.orders_count} 次服务)
              </span>
              <span className="views">
                👁️ {skill.views_count} 次浏览
              </span>
            </div>
          </div>

          {/* Provider Info */}
          <div className="provider-section">
            <img
              src={skill.provider_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={skill.provider_name}
              className="provider-avatar-large"
            />
            <div className="provider-details">
              <h3>{skill.provider_name}</h3>
              {skill.provider_university && (
                <p className="provider-uni">🎓 {skill.provider_university}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="skill-section">
            <h2>课程介绍</h2>
            <p className="skill-description-full">{skill.description}</p>
          </div>

          {/* Service Info */}
          <div className="skill-section">
            <h2>服务信息</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">服务模式</span>
                <span className="info-value">
                  {skill.service_mode === 'online' ? '📱 线上' : 
                   skill.service_mode === 'offline' ? '📍 线下' : '📱📍 两者皆可'}
                </span>
              </div>
              {skill.location && (
                <div className="info-item">
                  <span className="info-label">服务地点</span>
                  <span className="info-value">📍 {skill.location}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">课程时长</span>
                <span className="info-value">⏱️ {skill.duration_minutes} 分钟</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {skill.tags && skill.tags.length > 0 && (
            <div className="skill-section">
              <h2>标签</h2>
              <div className="tags-list">
                {skill.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="skill-section">
            <h2>学员评价</h2>
            {reviews.length === 0 ? (
              <p className="no-reviews">暂无评价</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <img
                        src={review.user_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                        alt={review.user_name}
                        className="reviewer-avatar"
                      />
                      <div className="reviewer-info">
                        <div className="reviewer-name">{review.user_name}</div>
                        <div className="review-rating">
                          {'⭐'.repeat(review.rating)}
                        </div>
                      </div>
                      <div className="review-date">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Booking Sidebar */}
        <aside className="booking-sidebar">
          <div className="booking-card">
            <div className="price-section">
              <span className="price-label">价格</span>
              <span className="price-value">¥{skill.price_per_hour}</span>
              <span className="price-unit">/小时</span>
            </div>

            {!showBooking ? (
              <button
                className="btn-book-now"
                onClick={() => setShowBooking(true)}
              >
                立即预约
              </button>
            ) : (
              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-group">
                  <label>预约时间</label>
                  <input
                    type="datetime-local"
                    value={bookingData.scheduledDate}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      scheduledDate: e.target.value
                    }))}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>留言（选填）</label>
                  <textarea
                    value={bookingData.message}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      message: e.target.value
                    }))}
                    placeholder="告诉服务者你的需求..."
                    className="form-textarea"
                    rows="4"
                  />
                </div>

                <div className="booking-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setShowBooking(false)}
                  >
                    取消
                  </button>
                  <button type="submit" className="btn-confirm">
                    确认预约
                  </button>
                </div>
              </form>
            )}

            <div className="booking-info">
              <div className="info-row">
                <span>✅ 平台托管支付</span>
              </div>
              <div className="info-row">
                <span>🔒 服务完成后结算</span>
              </div>
              <div className="info-row">
                <span>💬 站内即时沟通</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SkillDetail;

