import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderWorkflowPage.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function OrderWorkflowPage({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/buy-requests/${orderId}`);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': '#95a5a6',
      'Pending Approval': '#f39c12',
      'Approved': '#27ae60',
      'In Fulfillment': '#3498db',
      'Fulfilled': '#2ecc71'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Draft': '📝',
      'Pending Approval': '⏳',
      'Approved': '✅',
      'In Fulfillment': '🔄',
      'Fulfilled': '✔️'
    };
    return icons[status] || '📄';
  };

  const workflowSteps = ['Draft', 'Pending Approval', 'Approved', 'In Fulfillment', 'Fulfilled'];
  const currentStepIndex = workflowSteps.indexOf(order?.workflowStatus || 'Draft');

  if (loading) {
    return (
      <div className="order-workflow-modal">
        <div className="order-workflow-content">
          <div className="loading-spinner">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-workflow-modal">
        <div className="order-workflow-content">
          <div className="error-message">{error || 'Order not found'}</div>
          <button className="btn-close-error" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-workflow-modal" onClick={onClose}>
      <div className="order-workflow-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-workflow">
          <div className="header-left-workflow">
            <h2>🛒 Order Details</h2>
            <span className="order-id-badge">{order.id}</span>
          </div>
          <button className="close-btn-workflow" onClick={onClose}>&times;</button>
        </div>

        <div className="order-summary-section">
          <div className="order-info-grid">
            <div className="info-card">
              <div className="info-label">Portfolio</div>
              <div className="info-value">{order.portfolioTitle}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Requested By</div>
              <div className="info-value">{order.requestedBy}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Request Date</div>
              <div className="info-value">{order.requestDate}</div>
            </div>
            <div className="info-card">
              <div className="info-label">Status</div>
              <div
                className="status-badge-workflow"
                style={{ backgroundColor: getStatusColor(order.workflowStatus) }}
              >
                {getStatusIcon(order.workflowStatus)} {order.workflowStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Progress Visualization */}
        <div className="workflow-progress-section">
          <h3>📋 Workflow Progress</h3>
          <div className="workflow-timeline">
            {workflowSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <React.Fragment key={step}>
                  <div className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''}`}>
                    <div className="timeline-icon">
                      {isCompleted ? '✓' : getStatusIcon(step)}
                    </div>
                    <div className="timeline-label">{step}</div>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className={`timeline-connector ${isCompleted ? 'completed' : ''}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details-section">
          <h3>Order Information</h3>
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Quantity:</span>
              <span className="detail-value">{order.quantity} resource(s)</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">{order.duration}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Budget:</span>
              <span className="detail-value">${order.budget?.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Priority:</span>
              <span className={`priority-badge priority-${order.priority?.toLowerCase()}`}>
                {order.priority}
              </span>
            </div>
          </div>

          {order.selectedSkills && order.selectedSkills.length > 0 && (
            <div className="skills-section-workflow">
              <h4>Selected Skills ({order.selectedSkills.length})</h4>
              <div className="skills-badges">
                {order.selectedSkills.map(skillId => (
                  <span key={skillId} className="skill-badge">{skillId}</span>
                ))}
              </div>
            </div>
          )}

          {order.autoSelectedCertifications && order.autoSelectedCertifications.length > 0 && (
            <div className="certs-section-workflow">
              <h4>Auto-Selected Certifications ({order.autoSelectedCertifications.length})</h4>
              <div className="certs-badges">
                {order.autoSelectedCertifications.map(certId => (
                  <span key={certId} className="cert-badge">{certId}</span>
                ))}
              </div>
            </div>
          )}

          {order.businessJustification && (
            <div className="justification-section-workflow">
              <h4>Business Justification</h4>
              <p>{order.businessJustification}</p>
            </div>
          )}
        </div>

        {/* Workflow History */}
        {order.workflowHistory && order.workflowHistory.length > 0 && (
          <div className="history-section">
            <h3>📜 Workflow History</h3>
            <div className="history-timeline-vertical">
              {order.workflowHistory.map((entry, index) => (
                <div key={index} className="history-entry-card">
                  <div className="history-marker" style={{ backgroundColor: getStatusColor(entry.status) }}>
                    {getStatusIcon(entry.status)}
                  </div>
                  <div className="history-content-card">
                    <div className="history-header-row">
                      <span className="history-status-text">{entry.status}</span>
                      <span className="history-date-text">{entry.date}</span>
                    </div>
                    <div className="history-actor-text">By: {entry.actor}</div>
                    <div className="history-comments-text">{entry.comments}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fulfillment Progress */}
        {order.fulfillmentProgress !== undefined && (
          <div className="fulfillment-section">
            <h3>Fulfillment Progress</h3>
            <div className="progress-bar-large">
              <div
                className="progress-fill-large"
                style={{ width: `${order.fulfillmentProgress}%` }}
              />
            </div>
            <span className="progress-text">{order.fulfillmentProgress}% Complete</span>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderWorkflowPage;
