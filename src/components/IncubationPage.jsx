import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './CommonPage.css';

const IncubationPage = () => {
  const [incubations, setIncubations] = useState([]);
  const [filteredIncubations, setFilteredIncubations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const stages = ['All', 'Ideation', 'Development', 'Testing', 'Pilot', 'Production'];

  useEffect(() => {
    const fetchIncubations = async () => {
      try {
        const data = await staticDataService.getIncubation();
        setIncubations(data);
        setFilteredIncubations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incubations:', error);
        setLoading(false);
      }
    };
    fetchIncubations();
  }, []);

  const handleStageFilter = (stage) => {
    setSelectedStage(stage);
    if (stage === 'All') {
      setFilteredIncubations(incubations);
    } else {
      const filtered = incubations.filter(i => i.stage === stage);
      setFilteredIncubations(filtered);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return <div className="page-loading">Loading innovation projects...</div>;
  }

  return (
    <div className="common-page">
      <div className="page-header">
        <h1>🚀 TCS Innovation & Incubation</h1>
        <p>Explore our innovation initiatives powered by TCS CMI and emerging technologies</p>
      </div>

      <div className="category-filters">
        {stages.map(stage => (
          <button
            key={stage}
            className={`filter-btn ${selectedStage === stage ? 'active' : ''}`}
            onClick={() => handleStageFilter(stage)}
          >
            {stage}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filteredIncubations.map(incubation => (
          <div key={incubation.id} className="item-card incubation-card">
            <div className="item-header">
              <span className="item-category">{incubation.category}</span>
              <span className={`stage-badge ${incubation.stage.toLowerCase()}`}>
                {incubation.stage}
              </span>
            </div>

            <h3 className="item-title">{incubation.projectName}</h3>
            <p className="item-description">{incubation.description}</p>

            <div className="incubation-details">
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${incubation.status.toLowerCase()}`}>
                  {incubation.status}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Team Size:</span>
                <span className="detail-value">{incubation.team.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Start Date:</span>
                <span className="detail-value">{incubation.startDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Est. Completion:</span>
                <span className="detail-value">{incubation.estimatedCompletion}</span>
              </div>
            </div>

            {expandedId === incubation.id && incubation.milestones && (
              <div className="expanded-details">
                <div className="detail-section">
                  <h4>Project Milestones:</h4>
                  <div className="milestones-list">
                    {incubation.milestones.map((milestone, idx) => (
                      <div key={idx} className="milestone-item">
                        <span className={`milestone-status ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                          {milestone.status === 'Completed' ? '✓' :
                           milestone.status === 'In Progress' ? '◐' : '○'}
                        </span>
                        <div className="milestone-info">
                          <span className="milestone-name">{milestone.name}</span>
                          <span className="milestone-date">Due: {milestone.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {incubation.team && (
                  <div className="detail-section">
                    <h4>Team Members:</h4>
                    <div className="tags-container">
                      {incubation.team.map((member, idx) => (
                        <span key={idx} className="tech-tag">{member}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              className="expand-btn"
              onClick={() => toggleExpand(incubation.id)}
            >
              {expandedId === incubation.id ? 'Show Less ▲' : 'View Milestones ▼'}
            </button>
          </div>
        ))}
      </div>

      {filteredIncubations.length === 0 && (
        <div className="no-results">
          <p>No incubation projects found for this stage.</p>
        </div>
      )}
    </div>
  );
};

export default IncubationPage;
