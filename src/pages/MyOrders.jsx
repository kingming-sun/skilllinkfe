import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI, reviewAPI } from '../api';
import './MyOrders.css';

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const params = filter === 'all' ? {} : { status: filter };
      const data = await orderAPI.getOrders(params);
      setOrders(data.items);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    
    try {
      await reviewAPI.createReview({
        order_id: currentOrder.id,
        ...reviewData
      });
      
      alert('评价成功！');
      setShowReviewModal(false);
      setCurrentOrder(null);
      setReviewData({ rating: 5, comment: '' });
      loadOrders();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.detail || '评价失败');
    }
  };

  const statusColors = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    paid: '#10b981',
    in_progress: '#8b5cf6',
    completed: '#22c55e',
    cancelled: '#ef4444',
    refunded: '#6b7280'
  };

  const statusNames = {
    pending: '待确认',
    confirmed: '已确认',
    paid: '已支付',
    in_progress: '进行中',
    completed: '已完成',
    cancelled: '已取消',
    refunded: '已退款'
  };

  return (
    <div className="my-orders-page">
      <div className="orders-container">
        <h1 className="page-title">我的订单</h1>

        <div className="filters-tabs">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            待确认
          </button>
          <button
            className={`filter-tab ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            已确认
          </button>
          <button
            className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            已完成
          </button>
        </div>

        {loading ? (
          <div className="loading">加载中...</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <p>暂无订单</p>
            <button onClick={() => navigate('/skills')} className="btn-primary">
              去浏览技能
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-number">订单号：{order.order_number}</span>
                  <span
                    className="order-status"
                    style={{ color: statusColors[order.status] }}
                  >
                    {statusNames[order.status]}
                  </span>
                </div>

                <div className="order-body">
                  <div className="order-skill">
                    <h3>{order.skill_title}</h3>
                    <p className="order-participants">
                      服务者：{order.provider_name} · 预约人：{order.user_name}
                    </p>
                  </div>

                  <div className="order-details">
                    <div className="detail-item">
                      <span className="detail-label">预约时间</span>
                      <span className="detail-value">
                        {new Date(order.scheduled_date).toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">订单金额</span>
                      <span className="detail-value price">
                        ¥{order.total_amount}
                      </span>
                    </div>
                    {order.message && (
                      <div className="detail-item full-width">
                        <span className="detail-label">留言</span>
                        <span className="detail-value">{order.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-time">
                    下单时间：{new Date(order.created_at).toLocaleString()}
                  </div>
                  <div className="order-actions">
                    {order.status === 'completed' && (
                      <button
                        className="btn-review"
                        onClick={() => {
                          setCurrentOrder(order);
                          setShowReviewModal(true);
                        }}
                      >
                        写评价
                      </button>
                    )}
                    <button
                      className="btn-detail"
                      onClick={() => navigate(`/skills/${order.skill_id}`)}
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>写评价</h2>
            <form onSubmit={handleReview}>
              <div className="form-group">
                <label>评分</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= reviewData.rating ? 'active' : ''}`}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>评价内容</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  placeholder="分享你的学习体验..."
                  required
                  minLength={5}
                  rows="5"
                  className="form-textarea"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowReviewModal(false)}
                >
                  取消
                </button>
                <button type="submit" className="btn-submit">
                  提交评价
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOrders;

