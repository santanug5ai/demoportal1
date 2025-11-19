import React, { useState, useEffect } from 'react';
import staticDataService from '../services/staticDataService';
import './CommonPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const statuses = ['All', 'In Progress', 'Completed', 'On Hold'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await staticDataService.getProjects();
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(p => p.status === status);
      setFilteredProjects(filtered);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return <div className="page-loading">Loading projects...</div>;
  }

  return (
    <div className="common-page">
      <div className="page-header">
        <h1>📋 TCS Projects & Delivery</h1>
        <p>Active and completed projects with real-time status and reports</p>
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
        {filteredProjects.map(project => (
          <div key={project.id} className="item-card project-card">
            <div className="item-header">
              <span className="item-id">{project.id}</span>
              <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>

            <h3 className="item-title">{project.projectName}</h3>
            <p className="client-name">Client: {project.client}</p>

            <div className="progress-section">
              <div className="progress-header">
                <span>Progress</span>
                <span className="progress-value">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-details">
              <div className="detail-item">
                <span className="detail-label">Budget:</span>
                <span className="detail-value">${(project.budget / 1000000).toFixed(1)}M</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Team Size:</span>
                <span className="detail-value">{project.team.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">
                  {project.startDate} to {project.endDate}
                </span>
              </div>
            </div>

            {project.reports && project.reports.length > 0 && (
              <div className="latest-report">
                <strong>Latest Report:</strong> {project.reports[0].type} - {project.reports[0].date}
                <p className="report-summary">{project.reports[0].summary}</p>
              </div>
            )}

            {expandedId === project.id && project.risks && project.risks.length > 0 && (
              <div className="expanded-details">
                <div className="detail-section">
                  <h4>Risk Assessment:</h4>
                  <ul>
                    {project.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              className="expand-btn"
              onClick={() => toggleExpand(project.id)}
            >
              {expandedId === project.id ? 'Show Less ▲' : 'View Risks & Details ▼'}
            </button>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects found for this status.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
