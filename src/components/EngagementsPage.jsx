import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './CommonPage.css';

const EngagementsPage = () => {
  const [engagements, setEngagements] = useState([]);
  const [filteredEngagements, setFilteredEngagements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Pending', 'In Review', 'Approved', 'Assigned', 'Completed'];

  useEffect(() => {
    const fetchEngagements = async () => {
      try {
        const data = await staticDataService.getEngagements();
        setEngagements(data);
        setFilteredEngagements(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching engagements:', error);
        setLoading(false);
      }
    };
    fetchEngagements();
  }, []);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredEngagements(engagements);
    } else {
      const filtered = engagements.filter(e => e.status === status);
      setFilteredEngagements(filtered);
    }
  };

  if (loading) {
    return <div className="page-loading">Loading engagements...</div>;
  }

  return (
    <div className="common-page">
      <div className="page-header">
        <h1>🤝 TCS Engagement Requests</h1>
        <p>Request and track pre-sales support, SMEs, consultants, and professionals</p>
      </div>

      <div className="category-filters">
        {statuses.map(status => (
          <button
            key={status}
            className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
            onClick={() => handleStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filteredEngagements.map(engagement => (
          <div key={engagement.id} className="item-card engagement-card">
            <div className="item-header">
              <span className="engagement-type">{engagement.type}</span>
              <span className={`status-badge ${engagement.status.toLowerCase().replace(' ', '-')}`}>
                {engagement.status}
              </span>
            </div>

            <h3 className="item-title">{engagement.clientName}</h3>
            <p className="industry-name">{engagement.industry}</p>
            <p className="item-description">{engagement.description}</p>

            <div className="engagement-details">
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{engagement.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Priority:</span>
                <span className={`priority-badge ${engagement.priority.toLowerCase()}`}>
                  {engagement.priority}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Request Date:</span>
                <span className="detail-value">{engagement.requestDate}</span>
              </div>
            </div>

            {engagement.skillsRequired && (
              <div className="skills-required">
                <h4>Skills Required:</h4>
                <div className="tags-container">
                  {engagement.skillsRequired.map((skill, idx) => (
                    <span key={idx} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {engagement.assignedTo && (
              <div className="assigned-info">
                <strong>Assigned to:</strong> {engagement.assignedTo}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredEngagements.length === 0 && (
        <div className="no-results">
          <p>No engagements found for this status.</p>
        </div>
      )}
    </div>
  );
};

export default EngagementsPage;
