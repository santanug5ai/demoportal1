import React, { useState, useEffect } from 'react';
import './BuyRequestsPage.css';
import OrderWorkflowPage from './OrderWorkflowPage';
import buyRequestsData from '../data/buy-requests.json';

function BuyRequestsPage() {
  const [buyRequests, setBuyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [showOrderWorkflow, setShowOrderWorkflow] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    // Simulate loading for consistent UX
    setLoading(true);
    setTimeout(() => {
      setBuyRequests(buyRequestsData);
      setLoading(false);
    }, 300);
  }, []);

  const workflowStatuses = ['All', 'Draft', 'Pending Approval', 'Approved', 'In Fulfillment', 'Fulfilled'];

  const filteredRequests = selectedStatus === 'All'
    ? buyRequests
    : buyRequests.filter(r => r.workflowStatus === selectedStatus);

  const toggleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const handleViewOrderWorkflow = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderWorkflow(true);
  };

  const handleCloseOrderWorkflow = () => {
    setShowOrderWorkflow(false);
    setSelectedOrderId(null);
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

  if (loading) {
    return (
      <div className="buy-requests-page">
        <div className="loading-spinner">Loading buy requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="buy-requests-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="buy-requests-page">
      <div className="page-header">
        <h1>🛒 Buy Requests / Orders</h1>
        <p>Track your portfolio solution orders through the lead-to-order workflow</p>
      </div>

      {/* Workflow Status Filter */}
      <div className="workflow-filter">
        <label>Filter by Workflow Status:</label>
        <div className="workflow-buttons">
          {workflowStatuses.map(status => (
            <button
              key={status}
              className={`workflow-btn ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              {status !== 'All' && getStatusIcon(status)} {status}
              {status !== 'All' && (
                <span className="count">
                  ({buyRequests.filter(r => r.workflowStatus === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="workflow-visual">
        <h3>Lead-to-Order Workflow</h3>
        <div className="workflow-steps-horizontal">
          <div className="workflow-step-viz">
            <div className="step-icon">📝</div>
            <div className="step-label">Draft</div>
          </div>
          <div className="workflow-arrow-viz">→</div>
          <div className="workflow-step-viz">
            <div className="step-icon">⏳</div>
            <div className="step-label">Pending Approval</div>
          </div>
          <div className="workflow-arrow-viz">→</div>
          <div className="workflow-step-viz">
            <div className="step-icon">✅</div>
            <div className="step-label">Approved</div>
          </div>
          <div className="workflow-arrow-viz">→</div>
          <div className="workflow-step-viz">
            <div className="step-icon">🔄</div>
            <div className="step-label">In Fulfillment</div>
          </div>
          <div className="workflow-arrow-viz">→</div>
          <div className="workflow-step-viz">
            <div className="step-icon">✔️</div>
            <div className="step-label">Fulfilled</div>
          </div>
        </div>
      </div>

      {/* Buy Requests Grid */}
      <div className="buy-requests-grid">
        {filteredRequests.map(request => (
          <div key={request.id} className="buy-request-card">
            <div className="card-header">
              <div className="header-left">
                <span className="request-id">{request.id}</span>
                <h3>{request.portfolioTitle}</h3>
              </div>
              <span
                className="status-badge-large"
                style={{ backgroundColor: getStatusColor(request.workflowStatus) }}
              >
                {getStatusIcon(request.workflowStatus)} {request.workflowStatus}
              </span>
            </div>

            <div className="card-body">
              <div className="info-row">
                <div className="info-item">
                  <strong>Requested By:</strong>
                  <span>{request.requestedBy}</span>
                </div>
                <div className="info-item">
                  <strong>Request Date:</strong>
                  <span>{request.requestDate}</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <strong>Quantity:</strong>
                  <span>{request.quantity} resource(s)</span>
                </div>
                <div className="info-item">
                  <strong>Duration:</strong>
                  <span>{request.duration}</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <strong>Budget:</strong>
                  <span>${request.budget?.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <strong>Priority:</strong>
                  <span className={`priority-badge priority-${request.priority?.toLowerCase()}`}>
                    {request.priority}
                  </span>
                </div>
              </div>

              <div className="skills-section">
                <strong>Selected Skills ({request.selectedSkills?.length || 0}):</strong>
                <div className="skills-badges-small">
                  {request.selectedSkills?.slice(0, 3).map(skillId => (
                    <span key={skillId} className="skill-badge-small">{skillId}</span>
                  ))}
                  {request.selectedSkills?.length > 3 && (
                    <span className="more-badge">+{request.selectedSkills.length - 3} more</span>
                  )}
                </div>
              </div>

              {request.autoSelectedCertifications && request.autoSelectedCertifications.length > 0 && (
                <div className="certs-section">
                  <strong>Auto-Selected Certifications ({request.autoSelectedCertifications.length}):</strong>
                  <div className="cert-badges-small">
                    {request.autoSelectedCertifications.slice(0, 2).map(certId => (
                      <span key={certId} className="cert-badge-small">{certId}</span>
                    ))}
                    {request.autoSelectedCertifications.length > 2 && (
                      <span className="more-badge">+{request.autoSelectedCertifications.length - 2} more</span>
                    )}
                  </div>
                </div>
              )}

              {request.businessJustification && (
                <div className="justification-section">
                  <strong>Business Justification:</strong>
                  <p>{request.businessJustification}</p>
                </div>
              )}
            </div>

            <div className="card-footer">
              <button
                className="btn-view-workflow"
                onClick={() => handleViewOrderWorkflow(request.id)}
              >
                👁️ View Full Workflow
              </button>
              <button
                className="btn-view-details"
                onClick={() => toggleExpand(request.id)}
              >
                {expandedRequest === request.id ? '▲ Hide Workflow History' : '▼ View Workflow History'}
              </button>
            </div>

            {/* Expanded - Workflow History */}
            {expandedRequest === request.id && request.workflowHistory && (
              <div className="workflow-history">
                <h4>📋 Workflow History</h4>
                <div className="history-timeline">
                  {request.workflowHistory.map((entry, index) => (
                    <div key={index} className="history-entry">
                      <div className="history-dot" />
                      <div className="history-content">
                        <div className="history-header">
                          <span className="history-status">{entry.status}</span>
                          <span className="history-date">{entry.date}</span>
                        </div>
                        <div className="history-actor">By: {entry.actor}</div>
                        <div className="history-comments">{entry.comments}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {request.fulfillmentProgress !== undefined && (
                  <div className="fulfillment-progress">
                    <strong>Fulfillment Progress:</strong>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${request.fulfillmentProgress}%` }}
                      />
                    </div>
                    <span className="progress-percent">{request.fulfillmentProgress}%</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="no-data">
          No buy requests found for the selected status.
        </div>
      )}

      {/* Order Workflow Modal */}
      {showOrderWorkflow && selectedOrderId && (
        <OrderWorkflowPage
          orderId={selectedOrderId}
          onClose={handleCloseOrderWorkflow}
        />
      )}
    </div>
  );
}

export default BuyRequestsPage;
